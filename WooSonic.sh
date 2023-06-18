#!/bin/bash

print_decoration() {
      GREEN='\033[0;32m'
      NC='\033[0m' # No Color
    echo -e "██╗    ██╗  ██████╗   ██████╗  ███████╗  ██████╗  ███╗   ██╗ ██╗ ███████╗"
    echo -e "██║    ██║ ██╔═══██╗ ██╔═══██╗ ██╔════╝ ██╔═══██╗ ████╗  ██║ ██║ ██╔════╝"
    echo -e "██║ █╗ ██║ ██║   ██║ ██║   ██║ ███████╗ ██║   ██║ ██╔██╗ ██║ ██║ ██║     "
    echo -e "██║███╗██║ ██║   ██║ ██║   ██║ ╚════██║ ██║   ██║ ██║╚██╗██║ ██║ ██║    "
    echo -e "╚███╔███╔╝ ╚██████╔╝ ╚██████╔╝ ███████║ ╚██████╔╝ ██║ ╚████║ ██║ ███████╗"
    echo -e " ╚══╝╚══╝   ╚═════╝   ╚═════╝  ╚══════╝  ╚═════╝  ╚═╝  ╚═══╝ ╚═╝ ╚══════╝"
    echo -e "***************************************************************** ${GREEN}Beta V1${NC}"
}
print_decoration

# Function to check if Docker is installed
check_docker_installed() {
    if command -v docker &>/dev/null; then
        echo -e "\033[1;32mDocker is already installed. \xE2\x9C\x94\033[0m"
        return 0
    else
        return 1
    fi
}

# Function to install Docker
install_docker() {
    echo "Installing Docker..."
    # Add Docker repository and install Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    sudo systemctl enable docker
    sudo systemctl start docker
    echo -e "\033[1;32mDocker installation completed. \xE2\x9C\x94\033[0m"
}

# Function to check if Docker Compose is installed
check_docker_compose_installed() {
    if command -v docker-compose &>/dev/null; then
        echo -e "\033[1;32mDocker Compose is already installed. \xE2\x9C\x94\033[0m"
        return 0
    else
        return 1
    fi
}

# Function to install Docker Compose
install_docker_compose() {
    echo "Installing Docker Compose..."
    # Download Docker Compose binary
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "\033[1;32mDocker Compose installation completed. \xE2\x9C\x94\033[0m"
}

# Function to prompt for password
prompt_for_password() {
    read -s -p "Enter your root password: " password
    echo
}
prompt_for_password
# Check if Docker is already installed
if ! check_docker_installed; then
    # Install Docker
    install_docker
fi

# Check if Docker Compose is already installed
if ! check_docker_compose_installed; then
    # Install Docker Compose
    install_docker_compose
fi

# Prompt for environment type
PS3="Select the environment type: "
options=("staging" "live" "local")
select environment in "${options[@]}"; do
    case $environment in
        "staging")
            compose_file="./docker-compose.staging.yaml"
            nginx_conf_file="./deploy/staging/nginx.conf"
            break
            ;;
        "live")
            compose_file="/path/to/live/docker-compose.live.yaml"
            nginx_conf_file="./deploy/live/nginx.conf"
            break
            ;;
        "local")
            compose_file="./docker-compose.local.yaml"
            nginx_conf_file="./deploy/local/nginx.conf"
            break
            ;;
        *)
           echo -e "\033[1;31mInvalid Option \xE2\x9D\x8C\033[0m \n Please try again"
            ;;
    esac
done

# Prompt for the domain
read -p "Enter the new domain: " new_domain

# Update the NGINX configuration file with the new domain
echo "$password" | sudo -S sed -i '9s|.*|   server_name '"$new_domain"';|' "$nginx_conf_file"
echo "$password" | sudo -S sed -i '24s|.*|  server_name backend.'"$new_domain"';|' "$nginx_conf_file"
echo -e "\033[1;32mNginx configured Successfully. \xE2\x9C\x94\033[0m"

# Bring up containers using Docker Compose
echo "Bringing up containers for $environment environment..."
echo "$password" | sudo -S docker-compose -f "$compose_file" up -d

# Update the MySQL database with the new domain
output=$(docker exec -i pwa-db mysql -uroot -pexample -e "use pwa; update wp_options set option_value ='https://$new_domain' where option_id in (1,2);" 2>&1)
exit_code=$?
# Check if any error occurred
if [ $exit_code -ne 0 ]; then
    echo -e "\033[1;31mError: Failed to update MySQL container. \xE2\x9D\x8C\033[0m \n Details: $output"
    exit 1
else
    echo -e "\033[1;32mMySQL row updated successfully. \xE2\x9C\x94\033[0m"
fi

echo -e "\033[1;32mConfiguration completed for $environment environment. \xE2\x9C\x94\033[0m"
=======
#!/bin/bash

print_decoration() {
      GREEN='\033[0;32m'
      NC='\033[0m' # No Color
    echo -e "██╗    ██╗  ██████╗   ██████╗  ███████╗  ██████╗  ███╗   ██╗ ██╗ ███████╗"
    echo -e "██║    ██║ ██╔═══██╗ ██╔═══██╗ ██╔════╝ ██╔═══██╗ ████╗  ██║ ██║ ██╔════╝"
    echo -e "██║ █╗ ██║ ██║   ██║ ██║   ██║ ███████╗ ██║   ██║ ██╔██╗ ██║ ██║ ██║     "
    echo -e "██║███╗██║ ██║   ██║ ██║   ██║ ╚════██║ ██║   ██║ ██║╚██╗██║ ██║ ██║    "
    echo -e "╚███╔███╔╝ ╚██████╔╝ ╚██████╔╝ ███████║ ╚██████╔╝ ██║ ╚████║ ██║ ███████╗"
    echo -e " ╚══╝╚══╝   ╚═════╝   ╚═════╝  ╚══════╝  ╚═════╝  ╚═╝  ╚═══╝ ╚═╝ ╚══════╝"
    echo -e "***************************************************************** ${GREEN}Beta V1${NC}"
}
print_decoration

# Function to check if Docker is installed
check_docker_installed() {
    if command -v docker &>/dev/null; then
        echo -e "\033[1;32mDocker is already installed. \xE2\x9C\x94\033[0m"
        return 0
    else
        return 1
    fi
}

# Function to install Docker
install_docker() {
    echo "Installing Docker..."
    # Add Docker repository and install Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    sudo systemctl enable docker
    sudo systemctl start docker
    echo -e "\033[1;32mDocker installation completed. \xE2\x9C\x94\033[0m"
}

# Function to check if Docker Compose is installed
check_docker_compose_installed() {
    if command -v docker-compose &>/dev/null; then
        echo -e "\033[1;32mDocker Compose is already installed. \xE2\x9C\x94\033[0m"
        return 0
    else
        return 1
    fi
}

# Function to install Docker Compose
install_docker_compose() {
    echo "Installing Docker Compose..."
    # Download Docker Compose binary
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "\033[1;32mDocker Compose installation completed. \xE2\x9C\x94\033[0m"
}

# Function to prompt for password
prompt_for_password() {
    read -s -p "Enter your root password: " password
    echo
}
prompt_for_password
# Check if Docker is already installed
if ! check_docker_installed; then
    # Install Docker
    install_docker
fi

# Check if Docker Compose is already installed
if ! check_docker_compose_installed; then
    # Install Docker Compose
    install_docker_compose
fi

# Prompt for environment type
PS3="Select the environment type: "
options=("staging" "live" "local")
select environment in "${options[@]}"; do
    case $environment in
        "staging")
            compose_file="./docker-compose.staging.yaml"
            nginx_conf_file="./deploy/staging/nginx.conf"
            break
            ;;
        "live")
            compose_file="/path/to/live/docker-compose.live.yaml"
            nginx_conf_file="./deploy/live/nginx.conf"
            break
            ;;
        "local")
            compose_file="./docker-compose.local.yaml"
            nginx_conf_file="./deploy/local/nginx.conf"
            break
            ;;
        *)
           echo -e "\033[1;31mInvalid Option \xE2\x9D\x8C\033[0m \n Please try again"
            ;;
    esac
done

# Prompt for the domain
read -p "Enter the new domain: " new_domain

# Update the NGINX configuration file with the new domain
echo "$password" | sudo -S sed -i '9s|.*|   server_name '"$new_domain"';|' "$nginx_conf_file"
echo "$password" | sudo -S sed -i '24s|.*|  server_name backend.'"$new_domain"';|' "$nginx_conf_file"
echo -e "\033[1;32mNginx configured Successfully. \xE2\x9C\x94\033[0m"

# Bring up containers using Docker Compose
echo "Bringing up containers for $environment environment..."
echo "$password" | sudo -S docker-compose -f "$compose_file" up -d

# Update the MySQL database with the new domain
output=$(docker exec -i pwa-db mysql -uroot -pexample -e "use pwa; update wp_options set option_value ='https://$new_domain' where option_id in (1,2);" 2>&1)
exit_code=$?
# Check if any error occurred
if [ $exit_code -ne 0 ]; then
    echo -e "\033[1;31mError: Failed to update MySQL container. \xE2\x9D\x8C\033[0m \n Details: $output"
    exit 1
else
    echo -e "\033[1;32mMySQL row updated successfully. \xE2\x9C\x94\033[0m"
fi

echo -e "\033[1;32mConfiguration completed for $environment environment. \xE2\x9C\x94\033[0m"