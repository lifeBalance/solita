.PHONY:
memories:
	curl https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv -L --output ./docker/mongo/datasets/2021-05.csv
	curl https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv -L --output ./docker/mongo/datasets/2021-06.csv
	curl https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv -L --output ./docker/mongo/datasets/2021-07.csv
	curl https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv -L --output ./docker/mongo/datasets/stations.csv
	docker compose -f compose-dev.yml up