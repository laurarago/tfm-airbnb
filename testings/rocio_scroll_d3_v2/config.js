var config = {
  style: 'mapbox://styles/laurarago/ckq1iuxap0wkk17p96m3vsgkj',
  accessToken: 'pk.eyJ1IjoibGF1cmFyYWdvIiwiYSI6ImNrbW42Nm1tYjFydHIydms1MmR2OWxsY3cifQ.TGWXqKIR57SVIHtUeBCbog',
  showMarkers: false,
  theme: 'light',
  alignment: 'center',
  subtitle: '',
  byline: '',
  footer: '',
  chapters: [
    {
      id: 'Start',
      title: 'A journey through Catalonia conquered by Airbnb',
      image: '',
      description: 'The Airbnb tourist rental platform offers up to <span style="background-color: #29DDC7">73,800 apartments</span> throughout the Catalan territory. Swipe down to see how they are distributed and learn more about the tourist stress suffered by some of the towns'
    ,
      location: {
        center: { lon: 1.35692, lat: 42.13644 },
        zoom: 6.98,
        pitch: 53.00,
        bearing: -20.80
      },
      onChapterEnter: [                 {
             layer: 'airbnb-fill',
             opacity: 0.7
         }],
      onChapterExit: [                 {
             layer: 'airbnb-fill',
             opacity: 0

        }]
    },
    {
      id: 'CostaBrava',
      title: 'Costa Brava gathers the most densest area of Airbnb',
      image: '',
      description: '<span style="background-color: #FFD208"><b>Costa Brava</b> is the tourist brand</span> that concentrates a greater number of these advertisements. 98% of the municipalities have at least one apartment. And nine of the 10 locations with the highest percentage of Airbnb are in this area.',
      location: {
        center: { lon: 2.97687, lat: 42.02785 },
        zoom: 9.53,
        pitch: 59.00,
        bearing: -44.00
      },
      onChapterEnter: [ {
        layer: 'airbnb-brand',
        opacity: 0.7,

   }],
      onChapterExit: [{
        layer: 'airbnb-brand',
        opacity: 0,

   }]
    },
    {
      id: 'Roses',
      title: `Roses: the Airbnb paradise in L'Empordà`,
      image: '',
      description: 'Of all of them, Roses is the one with the largest number of Airbnb apartments. Most are concentrated in the old town and in the Santa Margarida urbanization and near the Almadrava beach.',
      location: {
        center: { lon: 3.18551, lat: 42.28491 },
        zoom: 12.05,
        pitch: 60.00,
        bearing: 24.00
      },
      onChapterEnter: [ {
        layer: 'airbnb-brand',
        opacity: 0.7,

      },{
        layer: 'Roses',
        opacity: 0.5,
      }],
      onChapterExit: [{
        layer: 'airbnb-brand',
        opacity: 0
      },,{
        layer: 'Roses',
        opacity: 0,
      }]
    },
    {
      id: 'Roses',
      title: '',
      image: 'https://imagenes.cosasdebarcos.com/amarres/8/1/8/2/amarre-venta-65711060180969535353505449484569x.jpg',
      description: 'While Santa Margarida (picture above) is known for its tall towers of tourist apartments, the Canyelles and Almadrava area are characterized by houses with swimming pools and summer chalets.'
      ,
      location: {
        center: { lon: 3.18551, lat: 42.28491 },
        zoom: 12.05,
        pitch: 60.00,
        bearing: 24.00
      },
      onChapterEnter: [ {
        layer: 'airbnb-brand',
        opacity: 0.7,

      },{
        layer: 'Roses',
        opacity: 0.5,
      }],
      onChapterExit: [{
        layer: 'airbnb-brand',
        opacity: 0
      },,{
        layer: 'Roses',
        opacity: 0,
      }]
    },
    {
      id: 'Begur',
      title: 'Begur has more ads on Airnbnb than real homes in the town',
      image: '',
      description: 'According to data from the INE, there are <b>1,680 houses</b> in the entire municipality, while there are up to <b>2,088 different apartments</b> on airbnb.Although it is very likely that this mismatch is due to the fact that part of the apartments are rented by rooms, this fact is a good indicator of how tourism prevails in certain areas',
      location: {
        center: { lon: 3.16966, lat: 41.95200 },
        zoom: 11.40,
        pitch: 8.00,
        bearing: -92.00
      },
      onChapterEnter: [ {
        layer: 'airbnb-brand',
        opacity: 0.7
      },{
        layer: 'Begur',
        opacity: 0.5
      } ],
      onChapterExit: [{
        layer: 'airbnb-brand',
        opacity: 0,
      },,{
        layer: 'Begur',
        opacity: 0
      }]
    },
    {
      id: 'Costa Daurada',
      title: 'Costa Daurada, an area stressed area by tourism',
      image: './path/to/image/source.png',
      description: 'Copy these sections to add to your story.',
      location: {
        center: { lon: 1.11232, lat: 41.10637 },
        zoom: 9.96,
        pitch: 26.00,
        bearing: -8.00
      },
      onChapterEnter: [ {
        layer: 'airbnb-fill',
        opacity: 0.7,

   }],
      onChapterExit: [{
        layer: 'airbnb-fill',
        opacity: 0,

   }]
  },
  {
    id: 'Salou',
    title: 'This city of Salou is the one that better represnts this phenomena',
    image: './path/to/image/source.png',
    description: 'Copy these sections to add to your story.',
    location: {
      center: { lon: 1.12798, lat: 41.08047 },
      zoom: 12.96,
      pitch: 42.00,
      bearing: 12.00
    },
    onChapterEnter: [ {
      layer: 'airbnb-fill',
      opacity: 0.7,
    }],
    onChapterExit: [{
      layer: 'airbnb-fill',
      opacity: 0,

 }]
},
  {
    id: 'Naut Aran',
    title: 'Naut Aran is an exceptions in the middle of the pyrinees and the second one with a higher percentatge of airbnb',
    image: './path/to/image/source.png',
    description: 'Copy these sections to add to your story.',
    location: {
      center: { lon: 0.90358, lat: 42.71372 },
      zoom: 11.27,
      pitch: 18.50,
      bearing: 0.00
    },
    onChapterEnter: [ {
      layer: 'airbnb-fill',
      opacity: 0.7,

 }],
    onChapterExit: [{
      layer: 'airbnb-fill',
      opacity: 0,

 }]
  },
  {
    id: 'Barcelona',
    title: 'But Barcelona is the worst',
    image: './path/to/image/source.png',
    description: 'Copy these sections to add to your story.',
    location: {
      center: { lon: 2.12195, lat: 41.41609 },
zoom: 11.06,
pitch: 57.50,
bearing: -46.40
    },
    onChapterEnter: [ {
      layer: 'airbnb-fill',
      opacity: 0.7,

 }],
    onChapterExit: [{
      layer: 'airbnb-fill',
      opacity: 0,

 }]
  },
  {
    id: 'Lleida',
    title: 'But Barcelona is the worst',
    image: './path/to/image/source.png',
    description: 'Copy these sections to add to your story.',
    location: {
      center: { lon: 0.80473, lat: 41.84571 },
zoom: 9.26,
pitch: 56.00,
bearing: -14.35
    },
    onChapterEnter: [ {
      layer: 'airbnb-fill',
      opacity: 0.7,

 }],
    onChapterExit: [{
      layer: 'airbnb-fill',
      opacity: 0,

 }]
  },
  {
    id: 'Alamús',
    title: 'But Barcelona is the worst',
    image: './path/to/image/source.png',
    description: 'Copy these sections to add to your story.',
    location: {
      center: { lon: 0.73569, lat: 41.63954 },
zoom: 12.55,
pitch: 56.00,
bearing: 0.00
    },
    onChapterEnter: [ {
      layer: 'airbnb-fill',
      opacity: 0.7,

 }],
    onChapterExit: [{
      layer: 'airbnb-fill',
      opacity: 0,

 }]
  }
  ]
};