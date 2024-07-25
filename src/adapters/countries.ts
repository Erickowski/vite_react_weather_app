import { Country } from "@src/types";

export function CountriesAdapter(countries: Country[]) {
  const countriesFormatted = countries.reduce((countryEntity, country) => {
    return {
      ...countryEntity,
      [country.cca2]: {
        code: country.cca2,
        name: country.name.common,
        flag: country.flags.png,
      },
    };
  }, {});

  return countriesFormatted;
}
