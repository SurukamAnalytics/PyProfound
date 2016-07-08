# PyProfound
[![License](https://img.shields.io/badge/license-BSD-blue.svg)](LICENSE.md)

An easy to use GUI for sklearn, nltk and other python packages

Things to Do : 
- [ ] Decide what py profound should do?
- [ ] High level UI
- [ ] Architecture? - Should it be web or desktop-based
- [ ] Add Slack


Development 

To Run:

1. npm install -g electron-prebuilt
2. electron .

API:

1. checkout branch ml-api
2. cd ml-api
3. npm install
4. nodemon app.js
5. api listening at localhost:8000/ml-api/classify
   Requires POST parameters to be x-www-form-encoded
   * separator:"tab" or "comma" 
   * file_path: full file path to the uploaded file

## Related Projects

1. [AutoML: taking the human expert out of the loop](http://www.automl.org/)
2. [tpot](https://github.com/rhiever/tpot)
3. [Orange](orange.biolab.si)

## License

PyProfound is released under the [BSD 2-Clause license](https://github.com/SurukamAnalytics/pyprofound/blob/master/LICENSE.md).

