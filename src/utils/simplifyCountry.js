const exceptions = [
  {
    country: "El Salvador",
    nickname: "sal",
  },
  {
    country: "Chile",
    nickname: "chl",
  },
  {
    country: "Paraguay",
    nickname: "py",
  },
  {
    country: "Curacao",
    nickname: "cw",
  },
];

function simplifyCountry(country) {
  let _country = "";
  let exceptionValidation = exceptions.filter((excp) => {
    if (excp.country === country) {
      return excp;
    }
  });

  if (!!exceptionValidation && exceptionValidation.length > 0) {
    _country = exceptionValidation[0].nickname;
  } else {
    _country = country.toLowerCase().substring(0, 3);
  }
  console.log(_country);
  return _country;
}

export { simplifyCountry };
