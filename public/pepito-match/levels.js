/*
  w: is level width and height
  items: is the items that drop in this level. items from 0 to 6
  power_percent: is the percent chance of power to appear when you made a line of (4 or 5 or L)
  time: is the level time by seconds => 60 seconds = 1 min
  music: choose music for the level(0 or 1)
*/

const Levels = [
  {
    w:5, items:[6,3,5], power_percent:10, time:10, music:1,
    t:[
      '11111',
      '11111',
      '11111',
      '11111',
      '11111',
    ],
  }, // 1
  {
    w:6, items:[6,2,5,4], power_percent:20, time:60*10, music:1,
    t:[
      '111111',
      '111111',
      '111111',
      '111111',
      '111111',
      '011110',
    ],
  }, // 2
  {
    w:7, items:[1,0,2,5], power_percent:70, time:60*10, music:1,
    t:[
      '1111111',
      '1111110',
      '0111100',
      '0011110',
      '0111111',
      '1111111',
      '1111111',
    ],
  }, // 3
  {
    w:9, items:[3,4,5,6], power_percent:100, time:60*10, music:1,
    t:[
      '111101111',
      '111101111',
      '111101111',
      '111101111',
      '111101111',
      '111101111',
      '111101111',
      '111101111',
      '111101111',
    ],
  }, // 4
  {
    w:9, items:[3,4,5,6,1], power_percent:55, time:60*10, music:1,
    t:[
      '001111100',
      '011111110',
      '111111111',
      '000111000',
      '001111100',
      '011111110',
      '111111111',
      '011111110',
      '001111100',
    ],
  }, // 5
  {
    w:11, items:[3,4,6,1,2], power_percent:40, time:60*10, music:1,
    t:[
      '11111111111',
      '11111111111',
      '11111111111',
      '11111111111',
      '11111111111',
      '11111111111',
      '11111111111',
      '11111111111',
      '11111111111',
      '11111111111',
      '11111111111',
    ],
  }, // 6
  {
    w:8, items:[0,3,1,2,2], power_percent:50, time:60*10, music:1,
    t:[
      '11111111',
      '11111111',
      '11111111',
      '11111111',
      '11111111',
      '11111111',
      '11111111',
      '11111111',
    ],
  }, // 7
  {
    w:8, items:[0,5,1,6,6], power_percent:60, time:60*10, music:1,
    t:[
      '11111111',
      '11111111',
      '11111111',
      '00011000',
      '01111110',
      '11111111',
      '11100111',
      '11000011',
    ],
  }, // 8
  {
    w:7, items:[4,1,2,3,5], power_percent:100, time:60*15, music:1,
    t:[
      '1111111',
      '1111111',
      '1110111',
      '1110111',
      '1110111',
      '1111111',
      '0111110',
    ],
  }, // 9
  {
    w:9, items:[0,1,2,3], power_percent:100, time:60*14, music:1,
    t:[
      '001101100',
      '011111110',
      '111111111',
      '111101111',
      '111000111',
      '111101111',
      '111111111',
      '011111110',
      '001111100',
    ],
  }, // 10
  {
    w:10, items:[0,2,4,5,5], power_percent:5, time:60*10, music:1,
    t:[
      '1111111111',
      '1111111111',
      '1101111011',
      '1000111011',
      '1101111011',
      '1111111111',
      '1101111011',
      '1000111011',
      '1101111011',
      '1111111111',
    ],
  }, // 11
  {
    w:6, items:[2,4,6,1], power_percent:80, time:60*10, music:1,
    t:[
      '001100',
      '011110',
      '111111',
      '111111',
      '111111',
      '011110',
    ],
  }, // 12
  {
    w:7, items:[2,4,0,1], power_percent:70, time:60*10, music:1,
    t:[
      '1111111',
      '1111111',
      '1011111',
      '1001111',
      '1001111',
      '1001011',
      '1111001',
    ],
  }, // 13
  {
    w:8, items:[5,4,4,1], power_percent:30, time:60*12, music:1,
    t:[
      '11000011',
      '11111111',
      '11100111',
      '11000011',
      '11100111',
      '01111110',
      '00111100',
      '00011000',
    ],
  }, // 14
  {
    w:9, items:[0,6,3,2,1,5], power_percent:90, time:60*12, music:1,
    t:[
      '011111110',
      '011111110',
      '011111110',
      '011111110',
      '011111110',
      '011111110',
      '011111110',
      '011111110',
      '011111110',
    ],
  }, // 15
  {
    w:9, items:[3,2,1,5], power_percent:80, time:60*12, music:1,
    t:[
      '010101010',
      '010101010',
      '010101010',
      '010101010',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
    ],
  }, // 16
  {
    w:9, items:[3,5,1,0], power_percent:100, time:60*12, music:1,
    t:[
      '001101100',
      '101101101',
      '111101111',
      '010101010',
      '111101111',
      '111101111',
      '111101111',
      '101101101',
      '101101101',
    ],
  }, // 17
  {
    w:10, items:[6,2,1,0], power_percent:50, time:60*8, music:1,
    t:[
      '1111111111',
      '1010110101',
      '1111111111',
      '1010110101',
      '1111111111',
      '1010110101',
      '1111111111',
      '1010110101',
      '1111111111',
      '1010110101',
    ],
  }, // 18
  {
    w:8, items:[2,6,5,1,0], power_percent:50, time:60*6, music:1,
    t:[
      '11111111',
      '01111110',
      '01111110',
      '01111110',
      '01100110',
      '01100110',
      '01100110',
      '11111111',
    ],
  }, // 19
  {
    w:9, items:[0,1,2,3,4,5,6], power_percent:100, time:60*10, music:1,
    t:[
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
      '111111111',
    ],
  }, // 20
]
