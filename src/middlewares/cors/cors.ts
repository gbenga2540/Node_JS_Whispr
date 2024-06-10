import { ICorsOption } from '../../types/cors-option';
import { EnvConfig } from '../../utils/get-env';

const CorsOptions: ICorsOption = {
  origin: EnvConfig.clientOrigin,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

export default CorsOptions;
