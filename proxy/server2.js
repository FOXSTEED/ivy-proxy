const express = require('express')
// const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
// app.use('/listings/:id/', express.static(path.join(__dirname, 'public')));

const clientBundles = './proxy/public/services';
const serverBundles = './proxy/templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);
const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
}



app.get('/listings/:id/', function(req, res){
  let components = renderComponents(services, {itemid: req.params.id});
  // console.log(components)    
  // console.log(services)                                                                                                                                                                                                                               
  res.end(Layout(
    'SDC Demo',
    App(...components),
    Scripts(Object.keys(services))
  ));
});




app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});





// app.use('/q-and-a', (req, res) => {
//   axios.get(`http://localhost:3004/bundle.js`)
//     .then(res => res.data)
//     .then((data) => {
//       console.log('services', services)
//       res.send(data);
//     })
//     .catch((err) => {
//       res.send();
//     });
// });
