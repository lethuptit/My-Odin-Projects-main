function formatNumber(number){
    var formatter = new Intl.NumberFormat("en-US");
    return formatter.format(number)
  }

  console.log(formatNumber(12345))

export {formatNumber}