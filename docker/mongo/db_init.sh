#! /bin/bash
journeys_files=(
"../datasets/2021-05.csv"
"../datasets/2021-06.csv"
"../datasets/2021-07.csv"
)
stations_file="../datasets/stations.csv"

# Import the journeys
for f in "${journeys_files[@]}"
do
tail -n +2 $f | awk -F, '$7 > 10 && $8 > 10' | mongoimport --collection=journeys \
--type=csv --columnsHaveTypes --fieldFile=../datasets/journeys_fields.txt \
--maintainInsertionOrder \
--username=root --password=example --db=solita --authenticationDatabase=admin
done

# Import the stations (bit of repetition, just 4 lines, no biggie ;-)
tail -n +2 $stations_file | mongoimport --collection=stations \
--type=csv --columnsHaveTypes --fieldFile=../datasets/stations_fields.txt \
--maintainInsertionOrder \
--username=root --password=example --db=solita --authenticationDatabase=admin
