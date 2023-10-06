const codeList = [
  {
    code: "+51",
    country: "Peru",
  },
  {
    code: "+52",
    country: "Mexico",
  },
  {
    code: "+53",
    country: "Cuba",
  },
  {
    code: "+54",
    country: "Argentina",
  },
  {
    code: "+55",
    country: "Brasil",
  },
  {
    code: "+56",
    country: "Chile",
  },
  {
    code: "+57",
    country: "Colombia",
  },
  {
    code: "+58",
    country: "Venezuela",
  },
  {
    code: "+591",
    country: "Bolivia",
  },
  {
    code: "+593",
    country: "Ecuador",
  },
  {
    code: "+595",
    country: "Paraguay",
  },
  {
    code: "+598",
    country: "Uruguay",
  },
  {
    code: "+599",
    country: "Curacao",
  },
  {
    code: "+501",
    country: "Belice",
  },
  {
    code: "+502",
    country: "Guatemala",
  },
  {
    code: "+503",
    country: "El Salvador",
  },
  {
    code: "+504",
    country: "Honduras",
  },
  {
    code: "+505",
    country: "Nicaragua",
  },
  {
    code: "+506",
    country: "Costa Rica",
  },
  {
    code: "+507",
    country: "Panama",
  },
  {
    code: "+1",
    country: "Estados Unidos",
  },
  {
    code: "+204",
    country: "Canada",
  },
];

function getCountryByCode(phone) {
  let countryCode = codeList.filter((code) => {
    return phone.includes(code.code);
  });
  console.log(countryCode, phone);
  return countryCode !== undefined ? countryCode[0] : "NON";
}

export { getCountryByCode };
