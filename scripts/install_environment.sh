#!/bin/bash
# This script installs our dev environment
# Accepts two parameters: key filepath (ending by pem) and the VM network adress
# Usage: ./install_environment.sh keypath vmadress

keypath=$1
vmadress=$2

#Verifying number of args
if [ "$#" -ne 2 ]; then
	 echo "Invalid number of arguments. Usage: ./install_environment.sh <keypath> <vmadress> \n
Example: ./install_environment.sh ~/.ssh/test_key.pem azureuser@13.95.87.18"

else
	#Changing key rights
	chmod 400 $keypath

	#Connecting to VM and installing docker and docker engine
	ssh -i $keypath $vmadress "
		echo \"---Installing Open JDK 11...---\"
		sudo apt install openjdk-11-jdk
		echo \"---Installing docker...---\"
		echo \"------Checking for previous docker...---\"
		sudo apt-get remove docker docker-engine docker.io containerd runc
		echo \"------Getting updates...---\"
		sudo apt-get update
		echo \"------Installing...---\"
		sudo apt-get install \
				apt-transport-https \
				ca-certificates \
				curl \
				gnupg-agent \
				software-properties-common
		curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
		sudo add-apt-repository \
			 \"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
			 $(lsb_release -cs) \
			 stable\"

		echo \"---Installing docker-engine...---\"
		echo \"------Getting updates...---\"
		sudo apt-get update
		echo \"------Installing...---\"
		sudo apt-get install docker-ce docker-ce-cli containerd.io
		echo \"------Running Hello World...---\"
		sudo docker run hello-world

		echo \"---Executing docker as non-root user...---\"
		sudo groupadd docker
		sudo usermod -aG docker $USER
		exit
	"
	
	#Reconnecting and installing docker-compose and nodejs+npm
	ssh -i $keypath $vmadress "
		echo \"---Installing docker compose...---\"
		sudo curl -L \"https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose
		sudo chmod +x /usr/local/bin/docker-compose

		echo \"---Installing nodejs and npm...---\"
		sudo apt-get update
		sudo apt-get install nodejs npm
		sudo chown -R \$USER /usr/local/lib/
		sudo npm install -g npm	

		echo \"---Updating to last node version...---\"
		sudo npm cache clean -f
		sudo npm install -g n
		sudo n stable
		exit
	"

	#Reconnecting and installing Jhipster, cloning repo
	ssh -i $keypath $vmadress "
		echo \"---Installing Jhispster...---\"
		sudo npm install -g generator-jhipster
		if [ -f /home/\$USER/.config/generator-jhipster-nodejs/jhipster-insight.json ]; then
    		sudo chmod +rwx /home/\$USER/.config/generator-jhipster-nodejs/jhipster-insight.json
		fi
		if [ -f /home/\$USER/.config/ ]; then
    		sudo chmod a+rwx /home/\$USER/.config/
		fi
		echo \"---Cloning App repo...---\"
		git clone https://github.com/2020-2021-ECOM-INFO5-G04/App.git
		sudo chown -R 1000:1000 \"/home/azureuser/.npm\"

	"

fi
