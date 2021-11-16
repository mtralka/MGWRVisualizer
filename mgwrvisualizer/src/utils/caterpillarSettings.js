export const config = {
    responsive: true,
}

export const layout = {
    autosize: true,
    xaxis: {
        automargin: true,
      },
      yaxis: {
        automargin: true,
      },
}

export const sigPositiveGraph = {
    name: "Sig (+)",
    x: [],
    y: [],
    error_y: {
      type: 'data',
      array: [],
      visible: true,
      thickness: 1.5,
      color: 'rgb(255,99,71)',
      width: 3,
      opacity: 1
    },
    marker: {
    color: '#808080',
    size: 8
  },
    type: 'scatter'
  }

  export const sigNegativeGraph = {
    name: "Sig (-)",
    x: [],
    y: [],
    error_y: {
      type: 'data',
      array: [],
      visible: true,
      thickness: 1.5,
      color: '#0000ff',
      width: 3,
      opacity: 1
    },
    marker: {
    color: '#808080',
    size: 8
  },
    type: 'scatter'
  }

  export const insigGraph = {
    name: "Insig",
    x: [],
    y: [],
    error_y: {
      type: 'data',
      array: [],
      visible: true,
      thickness: 1.5,
      color: '#808080',
      width: 2,
      opacity: 1
    },
    marker: {
    color: '#808080',
    size: 8
  },
    type: 'scatter'
  }