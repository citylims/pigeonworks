if (Glitches.find().count() === 0) {
  Glitches.insert({
    moodName: 'Winter',
    title: 'Winter',
    author: 'Winter',
    audio: [
      {
        fileName:'Merry Xmas',
        fileLocation: 'audio/MerryXmas.mp3',
        fileType:'mp3'
      },
      {
        fileName:'The Little Light Fades',
        fileLocation: 'audio/TheLittleLightFades.mp3',
        fileType:'mp3'
      },
      {
        fileName:'Mystic',
        fileLocation: 'audio/Mystic.mp3',
        fileType:'mp3'
      },
      {
        fileName:'The Station',
        fileLocation: 'audio/TheStation.mp3',
        fileType:'mp3'
      },
    ],
    visual: [
      {
        fileName:'calmWinter',
        fileLocation: 'https://s3.amazonaws.com/pigeon-works/glitchy/winter/calmwinter.jpg',
        fileType:'jpg'
      },
      {
        fileName:'frozenWinter',
        fileLocation: 'https://s3.amazonaws.com/pigeon-works/glitchy/winter/frozenWinter.png',
        fileType:'png'
      },
      {
        fileName:'heavySnow',
        fileLocation: 'https://s3.amazonaws.com/pigeon-works/glitchy/winter/heavySnow.jpg',
        fileType:'jpg'
      },
      {
        fileName:'winterJapan',
        fileLocation: 'https://s3.amazonaws.com/pigeon-works/glitchy/winter/winterJapan.jpg',
        fileType:'jpg'
      }
    ],
    pairs: [
      {
        audio: {
          fileName:'Merry Xmas',
          fileLocation: 'audio/MerryXmas.mp3',
          fileType:'mp3'
        },
        visual: {
          fileName:'calmWinter',
          fileLocation: 'https://s3.amazonaws.com/pigeon-works/glitchy/winter/calmWinter.jpg',
          fileType:'jpg'
        }
      },
      {
        audio: {
          fileName:'Merry Xmas',
          fileLocation: 'audio/TheStation.mp3',
          fileType:'mp3'
        },
        visual: {
          fileName:'winterJapan',
          fileLocation: 'https://s3.amazonaws.com/pigeon-works/glitchy/winter/winterJapan.jpg',
          fileType:'jpg'
        }
      },
      {
        audio: {
          fileName:'The Little Light Fades',
          fileLocation: 'audio/TheLittleLightFades.mp3',
          fileType:'mp3'
        },
        visual: {
          fileName:'frozenWinter',
          fileLocation: 'https://s3.amazonaws.com/pigeon-works/glitchy/winter/frozenWinter.png',
          fileType:'png'
        }
      },
      {
        audio: {
          fileName:'The Little Light Fades',
          fileLocation: 'audio/Mystic.mp3',
          fileType:'mp3'
        },
        visual: {
          fileName:'frozenWinter',
          fileLocation: 'https://s3.amazonaws.com/pigeon-works/glitchy/winter/heavySnow.jpg',
          fileType:'jpg'
        }
      }
    ]      
  });
  Glitches.insert({
    moodName: 'Core'
  });
}
