// import React, { useEffect, useRef, useState } from 'react';
// import { StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { iconRegistry, IconTypes } from "./Icon"
import { 
  // Text, 
  TextProps } from "./Text"
import {Text} from '../components'
// import BluetoothSerial from 'react-native-bluetooth-serial';
// import EasyBluetooth from 'easy-bluetooth-classic';

import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Button, ViewStyle, TextStyle } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { withDecay } from "react-native-reanimated";

import { MyContext } from "../app"

export function TrackMap(props: TextProps) {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [receivedData, setReceivedData] = useState('');
  const [dataRead, setDataRead] = useState(false);
  const [shuttleX, setShuttleX] = useState(-18);
  const b = useContext(MyContext);


  useEffect(() => {
    BluetoothSerial.isEnabled().then(enabled => {
      if (!enabled) {
        BluetoothSerial.enable();
      }
      BluetoothSerial.list().then(devices => {
        devices.filter(device => {
          if (device.name == 'HC-05') {
            setDevices([device]);
          }
        });
      });
    });
  }, []);

  const connectToDevice = deviceAddress => {
    BluetoothSerial.connect(deviceAddress)
      .then(() => {
        setConnectedDevice(deviceAddress);
        console.log('Connected to device');
      })
      .catch(err => console.log(err.message));
  };

  const readData = () => {
    setDataRead(true);
    BluetoothSerial.readFromDevice().then(data => {
      setReceivedData(data);
      console.log(`Received data: ${data}`);
    });
  };

  const disconnectFromDevice = () => {
    BluetoothSerial.disconnect()
      .then(() => {
        setConnectedDevice(null);
        console.log('Disconnected from device');
      })
      .catch(err => console.log(err.message));
  };

  useEffect(() => {
    let timedRead, start = Date.now();
    if (dataRead) {
      timedRead = setInterval(() => {
        BluetoothSerial.readFromDevice().then(data => {
          if (data.length == 0) {
              data =' '
          }
          setReceivedData(data[0]);
          if (data[0] == 'A') {
            setShuttleX(-18);
            let end = Date.now();
            let elapsed = parseInt((end - start) /1000) * 5;   
            start = Date.now();
            console.log(elapsed);
            b.value = [elapsed, new Date().getDay(), new Date().getHours()]
            
          } else if (data[0] == 'B') {
            setShuttleX(172);
            let end = Date.now();
            let elapsed = parseInt((end - start) /1000) * 5;
            start = Date.now();
            console.log(elapsed);
            b.value = [elapsed, new Date().getDay(), new Date().getHours()]
          }
          console.log(`Received data: ${data[0]}`);
        });
      }, 200)  
    }
    return () => clearInterval(timedRead);
  },[dataRead])

  return (
    <View style={$container}>
      <Text preset="heading" style={$title}>Live Shuttle</Text>
      <View style={$deviceList}>
        <Text style={$subtitle}>Devices</Text>
        {devices.map(device => (
          <Button
            key={device.address}
            title={`${device.name} (${device.address})`}
            disabled={connectedDevice === device.address}
            onPress={() => connectToDevice(device.address)}
          />
        ))}
      </View>
      {connectedDevice && (
        <View style={$deviceDetails}>
          <Text style={$subtitle}>Connected Device</Text>
          <Text>{`${connectedDevice}`}</Text>
          <Button title="Disconnect" onPress={disconnectFromDevice} />
          <Button title="Read Data" onPress={readData} />
          <Text style={$subtitle}>Received Data</Text>
          <Text>{receivedData}</Text>
        </View>
      )}
      <View style={$map}>
        <View style={$stopcont}>
          <View style={{...$marker, left: shuttleX}}><Text style={$small}>Shuttle</Text></View>
        </View>
        <View style={$road}></View>
        <View style={$stopcont}>
          <View style={$stop1}><Text style={$small}>A</Text></View>
          <View style={$stop2}><Text style={$small}>B</Text></View>
        </View>
      </View>
    </View>
  );
}

const $map: ViewStyle = {
  flex: 1,
  width: '100%',
  backgroundColor: '#eee',
  alignItems: 'center',
  justifyContent: 'center',
}

const $road: ViewStyle = {
  height: 5,
  backgroundColor: '#000',
  width: 300
}

const $stop1: ViewStyle = {
  width: 12,
  height: 20,
  borderRadius: 20,
  backgroundColor: '#f00',
  borderWidth: 1,
  borderColor: '#000',
}

const $stop2: ViewStyle = {
  width: 12,
  height: 20,
  borderRadius: 20,
  backgroundColor: '#00f',
  borderWidth: 1,
  borderColor: '#000',
}

const $marker: ViewStyle = {
  width: 45,
  height: 20,
  backgroundColor: '#888',
  marginBottom: 2,
  borderWidth: 1,
  borderColor: '#000',
}

const $stopcont: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 200
}

const $container: ViewStyle = {
	flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
}

const $title: TextStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: 20,
}

const $small: TextStyle = {
  fontSize: 12,
  left: 1,
  color: '#fff'
}

const $subtitle: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 10,
  marginBottom: 5,
}

const $deviceList: ViewStyle = {
  alignSelf: 'stretch',
  padding: 20,
}

const $deviceDetails: ViewStyle = {
  alignSelf: 'stretch',
  padding: 20,
  borderTopWidth: 1,
  borderTopColor: '#ccc',
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   deviceList: {
//     flex: 1,
//     alignSelf: 'stretch',
//     padding: 20,
//   },
//   deviceDetails: {
//     flex: 1,
//     alignSelf: 'stretch',
//     padding: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//   },
// });

// export function TrackMap(props: TextProps) {
  // const config = {
  //     "deviceName": 'RN',
  //     "bufferSize": 1024,
  //     "delimiter": '\r\n',
  //     "uuid": '00001101-0000-1000-8000-00805F9B34FB'
  // }


  //   EasyBluetooth.init(config)
  //   .then((config) => {
  //     console.log("config done!");
  //   })
  //   .catch((ex) => {
  //     console.warn(ex);
  //   });
    
  // EasyBluetooth.startScan()
  //     .then((devices) => {
  //       console.log("all devices found:");
  //       console.log(devices);
  //     })
  //     .catch((ex) => {
  //       console.warn(ex);
  //     });

      // EasyBluetooth.connect(device)
      //   .then(() => {
      //     console.log("Connected!");
      //   })
      //   .catch((ex) => {
      //     console.warn(ex);
      //   })

  // EasyBluetooth.writeln("Works in React Native!")
  //     .then(() => {
  //       console.log("Writing...")
  //     })
  //     .catch((ex) => {
  //       console.warn(ex);
  //     })
  
//   return (
//     <View>
//       <Text>
//         Hello
//       </Text>
//     </View>
//     )
// }
// export function TrackMap(props: TextProps) {
//     const [devices, setDevices] = useState([]);
//   const [connectedDevice, setConnectedDevice] = useState(null);
//   const [receivedData, setReceivedData] = useState('');

//   const searchDevices = async () => {
//     try {
//       const devices = await BluetoothSerial.list();
//       setDevices(devices);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const connectToDevice = async (device) => {
//     try {
//       await BluetoothSerial.connect(device.id);
//       setConnectedDevice(device);
//       await BluetoothSerial.on('read', handleRead);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleRead = (data) => {
//     setReceivedData(data);
//     console.log(data)
//   };

//   useEffect(() => {
//     const getDevices = async () => {
//       try {
//         const enabled = await BluetoothSerial.isEnabled();
//         if (enabled) {
//           const devices = await BluetoothSerial.list();
//           setDevices(devices);
//         } else {
//           await BluetoothSerial.requestEnable();
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getDevices();

//     return () => {
//     //   BluetoothSerial.removeAllListeners();
//       BluetoothSerial.disconnect();
//     };
//   }, [BluetoothSerial.isEnabled()]);

//   return (
//     <View>
//       <TouchableOpacity onPress={searchDevices}>
//         <Text>Search Devices</Text>
//       </TouchableOpacity>

//       {devices.map((device) => (
//         <TouchableOpacity
//           key={device.id}
//           onPress={() => connectToDevice(device)}
//         >
//           <Text>{device.name}</Text>
//         </TouchableOpacity>
//       ))}

//       {connectedDevice && (
//         <View>
//           <Text>Connected to: {connectedDevice.name}</Text>
//           <Text>Received data: {receivedData}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// export function TrackMap(props: TextProps) {
//     const ref = useRef(null);
//     const [data, setData] = useState([1,2,3,4,5,6]);
//     const [isConnect, setIsConnect] = useState(false);
//     const [id, setId] = useState('');
//     const [latlon, setLatlon] = useState({
//         latitude: 12.9723,
//         longitude: 79.161,
//     });
//     const [count, setCount] = useState(0);
//     const shuttles = [
//         {
//             title: 'shuttle 1',
//             description: "Men's Hostel-Main Gate",
//             coord: latlon,
//         },
//     ];
//     const stops = [
//         {
//             title: 'L-Block',
//             description: 'MH',
//             coord: {
//                 latitude: 12.97238,
//                 longitude: 79.1627,
//             },
//         },
//         {
//             title: 'K-Block',
//             description: 'MH',
//             coord: {
//                 latitude: 12.97222,
//                 longitude: 79.1615,
//             },
//         },
//         {
//             title: 'M-Block',
//             description: 'MH',
//             coord: {
//                 latitude: 12.97258,
//                 longitude: 79.1639,
//             },
//         },
//     ];

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCount(count + 1);
//             if (count > 3) {
//                 setCount(0);
//                 setLatlon({
//                     latitude: 12.9723,
//                     longitude: 79.161,
//                 });
//             } else {
//                 setLatlon({
//                     latitude: latlon.latitude + 0.0001,
//                     longitude: latlon.longitude + 0.001,
//                 });
//             }
//         }, 2000);
//         return () => clearInterval(timer);
//     }, [latlon]);

//     BluetoothSerial.isConnected().then((connected) => {
//         setIsConnect(connected);
//         console.log('Connected?: ' + connected);
//     });

//     useEffect(() => {
//         BluetoothSerial.list().then((devices) => devices.forEach((device) => {
//             if (device.name == 'HC-05') {
//                 setId(device.id);
//                 console.log(id);
//                 return device
//             }
//         })).then(() =>
//             BluetoothSerial.connect(id).then(() => {
//                 console.log('Connected to HC-05');
//                 setIsConnect(true);
//                 console.log(11111111111111111)
//             })
//             .then(() => {
//                 console.log(2)
//                 BluetoothSerial.on('read', (data) => {
//                     console.log(data);
//                 })
//             }).catch((error) => {
//                     console.log(error);
//             })
//         )
//     },[])
    

//     return (
//         <View style={$mapScreen}>
//             {
//                 data.map((e) => {
//                     return <Text>{e}</Text>
//                 })
//             }
//         </View>
//     );
// };


// const $mapScreen: ViewStyle = {
// 	flex: 1,
// 	position: 'absolute',
// 	justifyContent: 'center',
// 	alignItems: 'center',
// 	width: '100%',
// 	height: '100%',
// }

// const $mapView: ViewStyle = {
// 	flex: 1
// }

// const $marker: ViewStyle = {
// 	position: 'absolute',
// }