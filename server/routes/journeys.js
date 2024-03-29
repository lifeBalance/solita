import express from 'express'
import { db } from '../db/conn.js'

const router = express.Router()

router.get('/journeys', getJourneys)

async function getJourneys(req, res) {
  // const page = parseInt(req.query.page)
  // const { minDuration, maxDuration } = {minDuration: '500', maxDuration: ''} // dummy values
  const {
    page,
    minDuration,
    maxDuration,
    minDistance,
    maxDistance,
    sortBy,
    orderBy
  } = req.query

  console.log(sortBy, orderBy)
  const journeysPerPage = 10
  const query = {}
  const sortParams = {}
  /* Let's build the query property by property...
  ** 
  ** Starting with the duration:
  */
  if (maxDuration && minDuration)
    query.duration = { $gt: + minDuration, $lt: +maxDuration }
  else if (maxDuration && !minDuration)
    query.duration = { $lt: +maxDuration }
  else if (!maxDuration && minDuration)
    query.duration = { $gt: +minDuration }

  // Then the distance
  if (maxDistance && minDistance)
    query.distance = { $gt: + minDistance, $lt: +maxDistance }
  else if (maxDistance && !minDistance)
    query.distance = { $lt: +maxDistance }
  else if (!maxDistance && minDistance)
    query.distance = { $gt: +minDistance }
  
  if (sortBy === 'departureStationName')
    sortParams.departureStationName = +orderBy
  else if (sortBy === 'returnStationName')
    sortParams.returnStationName = +orderBy
  else if (sortBy === 'distance')
    sortParams.distance = +orderBy
  else if (sortBy === 'duration')
    sortParams.duration = +orderBy

  const result = await db
    .collection('journeys')
    .find(
      { ...query },
      {
        projection: {
          departureStationName: 1,
          returnStationName: 1,
          distance: 1,
          duration: 1,
        },
      },
    )
    .skip(+page === 1 ? 0 : (+page - 1) * journeysPerPage)
    .limit(journeysPerPage)
    .sort(sortParams)
    .toArray()
  // console.log(result[0], 'end')   // testing (why does it log it twice 🤔)
  res.status(200).json(result)
}

export default router
