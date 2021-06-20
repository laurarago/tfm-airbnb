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
      title: '1. General Overview',
      image: './path/to/image/source.png',
      description: 'Description text goes here.',
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
      image: './path/to/image/source.png',
      description: 'Copy these sections to add to your story.',
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
      title: 'Roses is the one more airbnbs of all Catalonia',
      image: './path/to/image/source.png',
      description: 'Explain about santa margarida',
      location: {
        center: { lon: 3.17580, lat: 42.27173 },
        zoom: 13.05,
        pitch: 59.50,
        bearing: 24.00
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
      id: 'Begur',
      title: 'But Begur is the one with a higher percentage of airbnb of the total number of houses',
      image: './path/to/image/source.png',
      description: 'Copy these sections to add to your story.',
      location: {
        center: { lon: 3.20163, lat: 41.95066 },
zoom: 12.40,
pitch: 18.50,
bearing: -112.80
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
  }
  ]
};