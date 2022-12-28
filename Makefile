.PHONY:
memories:
	curl https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv --output ./docker/mongo/datasets/2021-05.csv
	curl https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv --output ./docker/mongo/datasets/2021-05.csv
	curl https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv --output ./docker/mongo/datasets/2021-05.csv
	curl https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv --output ./docker/mongo/datasets/stations.csv
	docker compose -f compose-dev.yml up