import fs from 'fs';
import {faker} from '@faker-js/faker';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
const departments = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];

const generateRandomData = (numEntries) => {
    const data = [];
    for (let i = 0; i < numEntries; i++) {
        const entry = {
            id: i + 1,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            dateOfBirth: faker.date.past({years: 50, refDate: new Date('2002-01-01')}).toISOString().split('T')[0],
            startDate: faker.date.recent({days: 365}).toISOString().split('T')[0],
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.helpers.arrayElement(states),
            zipCode: faker.location.zipCode(),
            department: faker.helpers.arrayElement(departments)
        };

        data.push(entry);
    }

    return data;
}

const writeDataToFile = (data, filename) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Successfully wrote data to', filename, ' you can now start to use the app');
        }
    });
}

const numEntries = 500; // number of mock entries you want to generate
const data = generateRandomData(numEntries);
const filename = 'mockData.json';

writeDataToFile(data, filename);
