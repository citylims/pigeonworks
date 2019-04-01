if (Glitches.find().count() === 0) {
  Glitches.insert({
    glitchName: "Meow",
    title: "Meow",
    author: "Pigeon",
    audio: [
      {fileName:'Meow',fileType:'mp3'},
    ],
    visual: [
      {fileName:'BathMeow',  fileType:'jpg'},
      {fileName:'KittenFight', fileType:'png'}
    ],
    pairs: [
      {
        audio: {fileName:'Meow', fileType:'mp3'},
        visual: {fileName:'BathMeow', fileType:'jpg'}
      },
      {
        audio: {fileName:'Meow', fileType:'mp3'},
        visual: {fileName:'KittenFight', fileType:'png'}
      },
    ]
  });
  Glitches.insert({
    glitchName: "DarkWave",
    title: "Dark Wave",
    author: "Pigeon",
    audio: [
      {fileName:'SheIsYoung',fileType:'mp3'},
    ],
    visual: [
      {fileName:'NightStreet',  fileType:'jpg'}
      // {fileName:'SkyScraper', fileType:'jpg'}
    ],
    pairs: [
      {
        audio: {fileName:'SheIsYoung', fileType:'mp3'},
        visual: {fileName:'NightStreet', fileType:'jpg'}
      }
      // {
      //   audio: {fileName:'SheIsYoung', fileType:'mp3'},
      //   visual: {fileName:'SkyScraper', fileType:'jpg'}
      // },
    ]
  });
  Glitches.insert({
    glitchName: "Winter",
    title: "Winter",
    author: "Pigeon",
    audio: [
      {fileName:'MerryXmas',fileType:'mp3'},
      {fileName:'TheLittleLightFades',fileType:'mp3'},
      {fileName:'Mystic',fileType:'mp3'},
      {fileName:'TheStation',fileType:'mp3'}
    ],
    visual: [
      {fileName:'calmWinter',  fileType:'jpg'},
      {fileName:'frozenWinter',  fileType:'png'},
      {fileName:'heavySnow',  fileType:'jpg'},
      {fileName:'winterJapan',  fileType:'jpg'}
    ],
    pairs: [
      {
        audio: {fileName:'MerryXmas', fileType:'mp3'},
        visual: {fileName:'calmWinter', fileType:'jpg'}
      },
      {
        audio: {fileName:'MerryXmas', fileType:'mp3'},
        visual: {fileName:'winterJapan', fileType:'jpg'}
      },
      {
        audio: {fileName:'TheLittleLightFades', fileType:'mp3'},
        visual: {fileName:'frozenWinter', fileType:'png'}
      },
      {
        audio: {fileName:'Mystic', fileType:'mp3'},
        visual: {fileName:'calmWinter', fileType:'jpg'}
      },
    ]
  });
  Glitches.insert({
    glitchName: "Core",
    title: "Core",
    author: "Pigeon",
    audio: [
      {fileName:'LiLo',fileType:'mp3'},
      {fileName:'Meow',fileType:'mp3'},
      {fileName:'TotalTeaTime',fileType:'mp3'},
      {fileName:'PoisonousGas',fileType:'mp3'}
    ],
    visual: [
      {fileName:'Blue',  fileType:'jpg'},
      {fileName:'Reaper',  fileType:'jpp'},
      {fileName:'HandGun',  fileType:'jpg'},
      {fileName:'NewYorker',  fileType:'jpg'},
      {fileName:'Wave',  fileType:'jpg'}  
    ],
    pairs: [
      {
        audio: {fileName:'LiLo', fileType:'mp3'},
        visual: {fileName:'HandGun', fileType:'jpg'}
      },
      {
        audio: {fileName:'Meow', fileType:'mp3'},
        visual: {fileName:'Reaper', fileType:'jpg'}
      },
      {
        audio: {fileName:'PoisonousGas', fileType:'mp3'},
        visual: {fileName:'Blue', fileType:'jpg'}
      },
      {
        audio: {fileName:'PoisonousGas', fileType:'mp3'},
        visual: {fileName:'Wave', fileType:'jpg'}
      },
      {
        audio: {fileName:'TotalTeaTime', fileType:'mp3'},
        visual: {fileName:'NewYorker', fileType:'jpg'}
      },
    ]
  });
  Glitches.insert({
    glitchName: "IceChoir",
    title: "Ice Choir",
    author: "Pigeon",
    audio: [
      {fileName:'Amorous',fileType:'mp3'},
      {fileName:'Unprepared',fileType:'mp3'}
    ],
    visual: [
      {fileName:'Ice Choir',  fileType:'jpg'},
      {fileName:'Plant',  fileType:'jpg'},
      {fileName:'GunGirl',  fileType:'jpp'}
    ],
    pairs: [
      {
        audio: {fileName:'Unprepared', fileType:'mp3'},
        visual: {fileName:'IceChoir', fileType:'jpg'}
      },
      {
        audio: {fileName:'Amorous', fileType:'mp3'},
        visual: {fileName:'GunGirl', fileType:'jpg'}
      },
      {
        audio: {fileName:'Unprepared', fileType:'mp3'},
        visual: {fileName:'Plant', fileType:'jpg'}
      },
    ]
  });
}
