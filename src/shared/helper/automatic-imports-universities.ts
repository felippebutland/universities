const cron = require('node-cron');
import { externalConnectionUsecase } from '../../modules/external/useCases/external-connection.usecase';
import { UniversityRepository } from '../../modules/universities/repository/university.repository'

const externalConnection = new externalConnectionUsecase(UniversityRepository);
cron.schedule('0 0 * * *', async () => {
    console.log('Importing universities...');
    await externalConnection.execute();
    console.log('Import completed.');
});

