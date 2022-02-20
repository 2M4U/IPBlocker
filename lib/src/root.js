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
  async CheckIP() {
    for (const ipAddress of ips) {
      switch (isPrivateIP(ipAddress)) {
        case true:
          console.timeLog(ipAddress);
          break;
        case false:
          await new Root().Execute(ipAddress);
          //console.log(ipAddress);
          break;
        default:
      }
    }
  }
  async Execute(ip) {
    if (ip.match(regex)) {
      exec(`sudo iptables -A INPUT -s ${ip} -j DROP`, (error, stdout, stderr) => {
          if (stderr) {
            return console.log(`${stderr}`);
          }
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }

          return console.log(`${ip} Dropped.`);
        }
      );
      exec(`sudo iptables-save`, (error, stdout, stderr) => {
        //console.log(stdout)
      });
    }
  }
}

module.exports = new Root();
