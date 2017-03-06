import ServiceActionConst from '../actions/ServiceConstants';

export const addService = (service) =>({
  type: ServiceActionConst.ADD_SERVICE,
  payload: service,
});

export const deleteService = (service) =>({
  type: ServiceActionConst.DELETE_SERVICE,
  payload: service,
});

export const updateService = (service) =>({
  type: ServiceActionConst.UPDATE_SERVICE,
  payload: service,
});
