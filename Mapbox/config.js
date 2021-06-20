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
      id: 'slug-style-id',
      title: 'General Overview',
      image: './path/to/image/source.png',
      description: 'Description text goes here.',
      location: {
        center: { lon: 2.04097, lat: 41.77438 },
        zoom: 8,
        pitch: 0,
        bearing: 0
      },
      onChapterEnter: [
        // {
        //     layer: 'layer-name',
        //     opacity: 1
        // }
      ],
      onChapterExit: [
        // {
        //     layer: 'layer-name',
        //     opacity: 0
        // }
      ]
    },
    {
      id: 'other-identifier',
      title: 'Roses approach',
      image: './path/to/image/source.png',
      description: 'Copy these sections to add to your story.',
      location: {
        center: { lon: 3.18189, lat: 42.26048 },
        zoom: 13.5,
        pitch: 60,
        bearing: -43.2
      },
      onChapterEnter: [],
      onChapterExit: []
    }
  ]
};