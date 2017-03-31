---
title: Code 128 Barcode generator
---

Code 128 Barcode Prep Tool
==========================

This tool will generate the [Code
128](https://en.wikipedia.org/wiki/Code_128) barcode encoding.
You can download these codes, incorporated back into
your original data. It displays "zebra" barcodes for reference and
validation purposes.

See [example](#example) below.

Using this tool, you can prepare a
**[CSV](https://en.wikipedia.org/wiki/Comma-separated_values "Comma Separated Values")**
file for import into inDesign (with the HP SmartStream plugin) for
printing barcodes.

The data that you wish to encode MUST be in the first column of your
input.

Test or Validate your data by uploading 100 or fewer records.

Demo
-----
See https://freephile.org/barcode/

The solution is entirely JavaScript, HTML and CSS based. There is no server-side processing, 
so it's completely self-contained and can be easily run off a local desktop.

Usage
-----

1.  Note that you should prepare your data in a spreadsheet, and then
    *use **Save As** to export your spreadsheet to the CSV format*. This
    tool does not accept Microsoft Excel files, or any other format
    besides CSV.
2.  Click the 'Choose File' button, and select your input data file.
3.  After your data is uploaded, a **Create download** button will
    appear.
4.  Click the `Create download` button, which will in turn reveal a
    download link. (This may take several seconds if you have a large
    file.)
5.  Click the download link and finally save the new CSV file. This file
    will have all your original data, plus an added column of Code 128
    data.



  ----------------------------
  Your data will appear here
  ----------------------------


Example
-------

Input : 6139409309059052\
Barcode format : Code128Auto\
Check Digit : N.A.\
The corresponding 128 Code :\


Computed...


Barcode :\
6139409309059052




Credits:\

© Copyright Greg Rundlett [eQuality
Technology](https://eQuality-Tech.com) 2017


Licensed under
[![GPLv3](https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPLv3_Logo.svg/88px-GPLv3_Logo.svg.png)](LICENSE)
the GPL v3\
ConnectCode's [javascript libraries for encoding](http://www.barcoderesource.com/htmlBarcode.shtml).\
Jon Ressig's [jQuery](https://jquery.com/)\
and Evan Plaice's extension [jquery-csv](https://github.com/evanplaice/jquery-csv) for handling csv files.

