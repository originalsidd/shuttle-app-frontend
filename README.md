<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

<center>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</center>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="static/images/logo.png" alt="Logo" width="400">
  </a>

  <h3 align="center">Shuttle App</h3>

  <p align="center">
    3D Version of the famous game about flying birds and dodging pillars
    <br />
    <a href="https://happy-bird.vercel.app/"><strong>Explore the game »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

![Happy Bird Main Menu][product-screenshot]

The proposed system consists of three main modules. First module is the IOT data
collection module which consists of a microcontroller, Arduino along with sensors to
detect the presence of a shuttle. Sensors like ultrasonic and colour sensors can be used to
detect when a shuttle passes, its location, timestamp, etc. The detection sensors will be
placed along the route of the movement of the shuttle at a convenient interval like shuttle
stops, for example every 200-300 meters. For fetching the data from the microcontroller,
we have used the Bluetooth sensor HC-05. We could also use an internet module or a
microcontroller embedded with internet module such as Node MCU, but for
demonstration and prototype version, we have used just a Bluetooth sensor.

The second module consists of the User app which is made using React Native and
supporting libraries. It fetches the data from the Bluetooth sensor on the Arduino using
classic Bluetooth package which supports the Bluetooth version of the HC-05 sensor.
The app displays information about where the shuttle is and which direction it is going
in on the designated shuttle route map which is similar in appearance to metro route map.
In addition, a notifications panel displaying a comment on the status of the delay time of
the shuttle. The app sends the data to a backend server when the shuttle passes through 2
stops, sending the data for time between the 2 stops, day of the week and hour of the day
for predicting the running status of the shuttle.

Third module is the server running on Node JS framework. A machine learning model
has been developed using the Random Forest algorithm programmed in python language
on a semi-generated dataset containing attributes like time between stop, day of the week, hour of the day, and the label being if the bus is late (1) or not (0). Datatype for each
attribute is numerical. The model is trained on the dataset and saved as a .joblib file. Now,
the app sends the data to the server using POST request and the server makes a prediction
using the saved model. The prediction is either 0 (not late i.e., fast) or 1 (late i.e., slow).
The data is sent back to the server as the response for the post request and the app displays
the notification if the bus is faster or slower than usual.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project is built with:

- React Native
- Ignite
- Python Server

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- CONTACT -->

## Contact

Siddharth Pal - [@originalsidd\_](https://www.instagram.com/originalsidd_) - originalsidd@gmail.com

Project Link: [https://github.com/originalsidd/happy-bird](https://github.com/originalsidd/happy-bird)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[forks-shield]: https://img.shields.io/github/forks/originalsidd/happy-bird?style=for-the-badge
[forks-url]: https://github.com/originalsidd/happy-bird/network/members
[stars-shield]: https://img.shields.io/github/stars/originalsidd/happy-bird?style=for-the-badge
[stars-url]: https://github.com/originalsidd/happy-bird/stargazers
[issues-shield]: https://img.shields.io/github/issues/originalsidd/happy-bird?style=for-the-badge
[issues-url]: https://github.com/originalsidd/happy-bird/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/siddharthpal20
[product-screenshot]: static/images/Screenshot.png
