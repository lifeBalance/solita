import express from 'express'
import { db } from '../db/conn.js'
import {ObjectId} from 'mongodb'

const router = express.Router()

router.get('/stations/:id', getStation)
router.get('/stations', getStationList)

async function getStationList(req, res) {
  const { page, search } = req.query
  const stationsPerPage = 20
  const query = {}
  if (search)
    query.Name = { $regex: new RegExp(search.toLowerCase()) }

  // console.log('searching for ', search, ` (${typeof search})`) // testing

  const result = await db
    .collection('stations')
    .find(
      query,
      {
        projection: {
          Name: 1,
          Adress: 1,
          Kaupunki: 1
        },
      },
    )
    .skip(+page === 1 ? 0 : (+page - 1) * stationsPerPage)
    .limit(stationsPerPage)
    .toArray()
  console.log(result) // testing
  res.status(200).json(result)
}

async function getStation(req, res) {
  const { id } = req.params

  console.log('searching for station', id, ` (${typeof id})`) // testing

  const stationIntel = await db
    .collection('stations')
    .findOne(
      { _id: ObjectId(id) },
      {
        projection: {
          Name: 1,
          Adress: 1,
          Kaupunki: 1
        },
      },
    )

  stationIntel.journeysStartingAt = await db
    .collection('journeys')
    .count(
      {
        departureStationName: stationIntel.Name
      }
    )

  stationIntel.journeysEndingAt = await db
    .collection('journeys')
    .count(
      {
        returnStationName: stationIntel.Name
      }
    )
  console.log(stationIntel) // testing
  res.status(200).json(stationIntel)
}

export default router
