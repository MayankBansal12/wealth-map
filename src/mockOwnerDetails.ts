export const mockOwnerDetails = {
  Status: 200,
  Message: 'state_1',
  Source: 'tps_byz_527_cch',
  'Person Details': [
    {
      Person_name: 'Jennifer Gubner',
      Age: '28',
      Born: 'August 1996',
      'Lives in': 'Denver, CO',
      Telephone: '925 461-5962',
    },
  ],
  'Current Address Details List': [
    {
      street_address: '4529 Winona Ct',
      address_locality: 'Denver',
      address_region: 'CO',
      postal_code: '80212',
      county: 'Denver County',
      date_range: '(Oct 2023 - May 2025)',
    },
  ],
  'All Phone Details': [
    {
      phone_number: '(925) 461-5962',
      phone_type: 'Landline',
      last_reported: 'Last reported Apr 2025',
      provider: 'AT&T',
    },
    {
      phone_number: '(303) 555-0123',
      phone_type: 'Mobile',
      last_reported: 'Last reported Mar 2025',
      provider: 'Verizon',
    },
  ],
  'Email Addresses': ['jgubner@wellesley.edu', 'jennifer.gubner@gmail.com'],
  'Previous Address Details': [
    {
      streetAddress: '3110 25th St',
      addressLocality: 'Boulder',
      addressRegion: 'CO',
      postalCode: '80304',
      county: 'Boulder County',
      timespan: '(Feb 2023 - Feb 2025)',
    },
    {
      streetAddress: '11836 Atlantic Ave',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90066',
      county: 'Los Angeles County',
      timespan: '(May 2022 - Feb 2025)',
    },
    {
      streetAddress: '4973 Dolores Dr',
      addressLocality: 'Pleasanton',
      addressRegion: 'CA',
      postalCode: '94566',
      county: 'Alameda County',
      timespan: '(Mar 2012 - Feb 2025)',
    },
    {
      streetAddress: '8444 W Bates Ct',
      addressLocality: 'Tracy',
      addressRegion: 'CA',
      postalCode: '95304',
      county: 'San Joaquin County',
      timespan: '(Jun 2021 - Jul 2023)',
    },
  ],
  'All Relatives': [
    {
      Name: 'Brian Gubner',
      Age: '58',
      'Person Link': 'https://www.truepeoplesearch.com/find/person/pr2084r0r0u6n2nn68n8',
      'Person ID': 'pr2084r0r0u6n2nn68n8',
    },
    {
      Name: 'Kevin Gubner',
      Age: '26',
      'Person Link': 'https://www.truepeoplesearch.com/find/person/px64624n609ul89u2u6nn',
      'Person ID': 'px64624n609ul89u2u6nn',
    },
    {
      Name: 'Jill M Gubner',
      Age: '54',
      'Person Link': 'https://www.truepeoplesearch.com/find/person/px64624n609ul89u2u6nn',
      'Person ID': 'px64624n609ul89u2u6nn',
    },
    {
      Name: 'Michael Gubner',
      Age: '84',
      'Person Link': 'https://www.truepeoplesearch.com/find/person/p9l6299n8r2649n4nuu0',
      'Person ID': 'p9l6299n8r2649n4nuu0',
    },
  ],
  'All Associates': [
    {
      Name: 'Sydney Stento',
      Age: '28',
      'Person Link': 'https://www.truepeoplesearch.com/find/person/px8rn2lr908n04r4l48n2',
      'Person ID': 'px8rn2lr908n04r4l48n2',
    },
    {
      Name: 'Ginette Olney',
      Age: '58',
      'Person Link': 'https://www.truepeoplesearch.com/find/person/px48r9862n9lr690424nn',
      'Person ID': 'px48r9862n9lr690424nn',
    },
    {
      Name: 'Nathan Olney',
      Age: '28',
      'Person Link': 'https://www.truepeoplesearch.com/find/person/p80994rn9r96r966906r',
      'Person ID': 'p80994rn9r96r966906r',
    },
    {
      Name: 'Terry Olney',
      Age: '58',
      'Person Link': 'https://www.truepeoplesearch.com/find/person/pnu42r9l69r0888lul98',
      'Person ID': 'pnu42r9l69r0888lul98',
    },
  ],
}

export const ownerSearchData = {
  Status: 200,
  Message: 'state_1; Use the /person_details_by_ID endpoint to gather more info!',
  Source: 'tps_byz_158',
  Records: 1,
  Page: 1,
  PeopleDetails: [
    {
      Name: 'Jennifer N Gubner',
      Link: 'https://www.truepeoplesearch.com/find/person/px48r4ll0u99lu64ul80r',
      Age: 28,
      'Person ID': 'px48r4ll0u99lu64ul80r',
      'Lives in': 'Denver, CO',
      'Used to live in': 'Boulder CO, Los Angeles CA, Pleasanton CA, Tracy CA',
      'Related to': 'Brian W Gubner, Jill M Gubner, Kevin Gubner, Michael Gubner',
    },
  ],
}
