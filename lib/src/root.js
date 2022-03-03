/*
  Created By: 2M4U
  Updated: 15/02/2022 
  Copyright 2022 2M4U
  Free To Use, Modify to your liking.
  IPs Provided By ThunderDoesDev
*/

const { isPrivateIP } = require("antipriv8");
const ips = require("./../ips/ips");
const { exec } = require("child_process");
const regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

class Root {
  async ipBlocker() {
    for (const ipAddress of ips) {
      switch (isPrivateIP(ipAddress)) {
        case true:
          console.timeLog(ipAddress);
          break;
        case false:
          if (ipAddress.match(regex)) {
            let { error, stdout, stderr } = await exec(
              `sudo iptables -A INPUT -s ${ipAddress} -j DROP`
            );
            if (stderr) {
              return console.log(`${stderr}`);
            }
            if (error !== null) {
              console.log(`exec error: ${error}`);
            }
            console.log(`${ipAddress} Dropped.`);

            let { stdout } = await exec("sudo iptables-save");
          }
          break;
      }
    }
  }
};

module.exports = new Root();
