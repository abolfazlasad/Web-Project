module.exports = function makeDeleteCustomer({ removeCustomer }) {
    return async function deleteCustomer(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const deleted = await removeCustomer({ id: httpRequest.params.id });
            return {
                headers,
                statusCode: deleted.deletedCount === 0 ? 404 : 200,
                body: { deleted }
            };
        } catch (e) {
            // TODO: Error logging
            console.log(e)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            };
        }
    }
}

module.exports = function makeGetCustomers({ listCustomers }) {
    return async function getCustomers(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const customers = await listCustomers({})
            return {
                headers,
                statusCode: 200,
                body: customers
            };
        } catch (e) {
            // TODO: Error logging
            console.log(e);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            };
        }
    }
}

module.exports = function makeEditCustomer({ editCustomer }) {
    return async function postEditCustomer(httpRequest) {
        try {
            const { ...customerInfo } = httpRequest.body;
            const toEdit = {
                ...customerInfo,
                id: httpRequest.params.id
            };
            const editedCustomer = await editCustomer(toEdit)
            return {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Last-Modified': new Date(editedCustomer.modifiedOn).toUTCString()
                },
                statusCode: 200,
                body: { patched: editedCustomer }
            };
        } catch (e) {
            // TODO: Error logging
            console.log(e)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 404,
                body: {
                    error: e.message
                }
            };
        }
    }
}


module.exports = function makeAddCustomer({ addCustomer }) {
    return async function postAddCustomer(httpRequest) {
        try {
            const { ...customerInfo } = httpRequest.body
            const newCustomer = await addCustomer({
                ...customerInfo,
            })
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: { posted: newCustomer }
            }
        } catch (e) {
            // TODO: Error logging
            console.log(e)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}