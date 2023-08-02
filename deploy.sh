#!/bin/bash
zero_downtime_deploy() {
service_name=remix
old_container_id=$(docker ps -f name=$service_name -q | tail -n1)
docker-compose -f docker-compose.staging.yml up -d --scale remix=2 --no-recreate --build

# Check the exit status of the previous command
if [ $? -eq 0 ]; then
    echo -e "\033[1;32mNew Container is up \xE2\x9C\x94\033[0m"
else
    echo -e "\033[1;31mError: Failed to make a new container. \xE2\x9D\x8C\033[0m"
    exit 1
fi
# Continue with stopping a specific container (replace "container_name" with the actual name of the container you want to stop)
docker stop $old_container_id
# Check the exit status of the "docker stop" command
if [ $? -eq 0 ]; then
    echo -e "\033[1;32mOld container stopped successfully. \xE2\x9C\x94\033[0m"
    docker exec -it pwa-nginx nginx -s reload
    if [ $? -eq 0 ]; then
      echo -e "\033[1;32mNginx reloaded successfully. \xE2\x9C\x94\033[0m"
    else
    echo -e "\033[1;31mSorry, an error occurred while reloading Nginx. \xE2\x9D\x8C\033[0m"
    echo "Rolling Back..."
    docker start $old_container_id
    exit 1
    fi
    docker rm $old_container_id
    if [ $? -eq 0 ]; then
      echo -e "\033[1;32mOld container removed successfully. \xE2\x9C\x94\033[0m"
    else
      echo -e "\033[1;31mSorry, an error occurred while removing the old container. \xE2\x9D\x8C\033[0m"
    fi
else
    echo -e "\033[1;31mSorry, an error occurred while stopping the old container. \xE2\x9D\x8C\033[0m"
fi

}
zero_downtime_deploy