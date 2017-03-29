/*
 * This file is part of HTML Barcode SDK.
 *
 *
 * ConnectCode provides its HTML Barcode SDK under a dual license model designed 
 * to meet the development and distribution needs of both commercial application 
 * distributors and open source projects.
 *
 * For open source projects, please see the GNU GPL notice below. 
 *
 * For Commercial Application Distributors (OEMs, ISVs and VARs), 
 * please see <http://www.barcoderesource.com/duallicense.shtml> for more information.
 *
 *
 *
 *
 * GNU GPL v3.0 License 
 *
 * HTML Barcode SDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * HTML Barcode SDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

		
		function DrawHTMLBarcode_ModifiedPlessy(data,
						    checkDigit,	
						    humanReadable,
						    units,
						    minBarWidth,
						    width,height,
						    textLocation,
						    textAlignment,
						    textStyle,
						    foreColor,
						    backColor)
		{
			return DrawBarcode_ModifiedPlessy(data,
						 checkDigit,
						 humanReadable,
						 units,
						 minBarWidth,
						 width,height,
						 textLocation,
						 textAlignment,
						 textStyle,
						 foreColor,
						 backColor,
						 "html");
		}

            function DrawBarcode_ModifiedPlessy(data,
 						    checkDigit,
						    humanReadable,
						    units,
						    minBarWidth,
						    width,height,
						    textLocation,
						    textAlignment,
						    textStyle,
						    foreColor,
						    backColor,
						    mode)
		{
			  if (foreColor==undefined)
				foreColor="black";
			  if (backColor==undefined)
				backColor="white";
			  if (textLocation==undefined)
				textLocation="bottom";
			  else if (textLocation!="bottom" && textLocation!="top")
				textLocation="bottom";
			  if (textAlignment==undefined)
				textAlignment="center";
			  else if (textAlignment!="center" && textAlignment!="left" && textAlignment!="right")
				textAlignment="center";
			  if (textStyle==undefined)
				textStyle="";
			  if (height==undefined)
				height=1;
			  else if (height<=0 || height >15)
				height=1;
			  if (width==undefined)
				width=3;
			  else if (width<=0 || width >15)
				width=3;
			  if (minBarWidth==undefined)
			      minBarWidth=0;
			  else if (minBarWidth<0 || minBarWidth >2)
			      minBarWidth=0;
			  if (units==undefined)
				units="in";
			  else if (units!="in" && units !="cm")
				units="in";
			  if (humanReadable==undefined)
				humanReadable="yes";
			  else if (humanReadable!="yes" && humanReadable !="no")
				humanReadable="yes";

			  var encodedData=EncodeModifiedPlessy(data,checkDigit);	
                    var humanReadableText = Get_Human_Text(data,checkDigit);
  		        var encodedLength = 0;
                    var thinLength = 0;
                    var thickLength = 0.0;
                    var totalLength = 0.0;
                    var incrementWidth = 0.0;
                    var swing = 1;
			  var result="";
			  var barWidth=0;
			  var thickWidth=0.0;
			  var svg;

			  encodedLength=encodedData.length;
			  totalLength=encodedLength;
	
                    if (minBarWidth > 0)
                    {
                        barWidth = minBarWidth.toFixed(2);
                        width=barWidth * totalLength;
                    }
                    else
                        barWidth = (width / totalLength).toFixed(2);
	
			  if (mode=="html")
			  {
				  if (textAlignment=='center')
					  result='<div style="text-align:center">';
				  else if (textAlignment=='left')
					  result='<div style="text-align:left;">';
				  else if (textAlignment=='right')
					  result='<div style="text-align:right;">';

				  var humanSpan="";
				  if (humanReadable=='yes' && textLocation=='top')
				  {
					if (textStyle=='')
						humanSpan='<span style="font-family : arial; font-size:12pt">'+humanReadableText+'</span><br />';
					else
						humanSpan='<span style='+textStyle+'>'+humanReadableText+'</span><br />';
				  }
				  result=result+humanSpan;
			  }
			  
                    for (x = 0; x < encodedData.length; x++)
                    {
                        var brush;

                        if (encodedData.substr(x,1) == 'b')
				   brush = foreColor;
				else
                           brush = backColor;

			      if (mode=="html")
				    result=result
					     +'<span style="border-left:'
					     +barWidth
					     +units
					     +' solid ' 
					     +brush
					     +';height:'
					     +height
					     +units+';display:inline-block;"></span>';
			      incrementWidth = incrementWidth + barWidth;
				
                      }

			  if (mode=="html")
			  {
				  var humanSpan="";
				  if (humanReadable=='yes' && textLocation=='bottom')
				  {
					if (textStyle=='')
						humanSpan='<br /><span style="font-family : arial; font-size:12pt">'+humanReadableText+'</span>';
					else
						humanSpan='<br /><span style='+textStyle+'>'+humanReadableText+'</span>';
				  }
				  result=result+humanSpan+"</div>";
			  }
			  return result;	
		}

		function EncodeModifiedPlessy(data,chk)
        	{
            var fontOutput = ConnectCode_Encode_ModifiedPlessy(data, chk);
            var output = "";
            var pattern = "";
            for (x = 0; x < fontOutput.length; x++)
            {
                switch (fontOutput.substr(x,1))
                {
                    case '{':
                        pattern = "bbw";
                        break;
                    case '}':
                        pattern = "bwwb";
                        break;
                    case '0':
                        pattern = "bwwbwwbwwbww";
                        break;
                    case '1':
                        pattern = "bwwbwwbwwbbw";
                        break;
                    case '2':
                        pattern = "bwwbwwbbwbww";
                        break;
                    case '3':
                        pattern = "bwwbwwbbwbbw";
                        break;
                    case '4':
                        pattern = "bwwbbwbwwbww";
                        break;
                    case '5':
                        pattern = "bwwbbwbwwbbw";
                        break;
                    case '6':
                        pattern = "bwwbbwbbwbww";
                        break;
                    case '7':
                        pattern = "bwwbbwbbwbbw";
                        break;
                    case '8':
                        pattern = "bbwbwwbwwbww";
                        break;
                    case '9':
                        pattern = "bbwbwwbwwbbs";
                        break;
			  default : break;
                }
                output=output+pattern;
            }
            return output;
	      }

		function Get_Human_Text(data,checkDigit)
		{
			var Result="";
			var cd="";
			var filtereddata="";
			filtereddata = filterInput(data);
			var filteredlength = filtereddata.length;
			if (checkDigit==1)
			{
				if (filteredlength > 15)
				{
					filtereddata = filtereddata.substr(0,15);
				}
				cd = generateCheckDigit(filtereddata);
			}
			else
			{
				if (filteredlength > 16)
				{
					filtereddata = filtereddata.substr(0,16);
				}
			}
			Result = filtereddata+cd;
  		      Result=html_decode(html_escape(Result));	
			return Result;
		}

		function ConnectCode_Encode_ModifiedPlessy(data,checkDigit)
		{
			var Result="";
			var cd="";
			var filtereddata="";
			filtereddata = filterInput(data);
			var filteredlength = filtereddata.length;
			if (checkDigit==1)
			{
				if (filteredlength > 15)
				{
					filtereddata = filtereddata.substr(0,15);
				}
				cd = generateCheckDigit(filtereddata);
			}
			else
			{
				if (filteredlength > 16)
				{
					filtereddata = filtereddata.substr(0,16);
				}
			}
			Result = "{" + filtereddata+cd+"}";
  		      Result=html_decode(html_escape(Result));	
			return Result;
		}

		function filterInput(data)
		{
			var Result="";
			var datalength=data.length;
			for (x=0;x<datalength;x++)
			{
				if (data.charCodeAt(x)>=48 && data.charCodeAt(x)<=57)
				{
					Result = Result + data.substr(x,1);
				}
			}
			return Result;
		}

		function generateCheckDigit(data)
		{
                  var doublechar = "";
                  var doubleStr = "";
                  var doubleNumber = 0;
                
                  var datalength = 0;
                  var lastcharpos = 0;
                  var Result = 0;
                  var strResult = "";
                  var barcodechar = "";
                  var barcodevalue = 0;
                  var toggle = 1;
                  var Sum = 0;
                
                  datalength = data.length;
                  lastcharpos = datalength - 1;
                
                  for (x=lastcharpos;x>=0;x--)
                  {
                      barcodevalue = data.charCodeAt(x) - 48;
                       
                      if (toggle == 1)
			    {
                            doubleStr = data.substr(x,1) + doubleStr;
                            toggle = 0;
                      }
			    else
			    {
                            Sum = Sum + barcodevalue;
                            toggle = 1;
                      }
                  }
                  
                  doubleNumber = parseInt(doubleStr,10);
                  doubleNumber = doubleNumber * 2;
                  doubleStr = doubleNumber.toString();
                  
                  for (y = 0;y<doubleStr.length;y++)
			{                  
                    barcodevalue = doubleStr.charCodeAt(y)-48;
                    Sum = Sum + barcodevalue;
                  }
                
                  if ((Sum % 10) == 0)
			{
                        Result = 48;
			}
                  else
			{
                        Result = (10 - (Sum % 10)) + 48;
                  }
                  strResult = (Result-48).toString();
                  return strResult;
		}


		function html_escape(data)
		{
			var Result="";
			for (x=0;x<data.length;x++)
			{
				Result=Result+"&#"+data.charCodeAt(x).toString()+";";
			}
			return Result;
		}

		function html_decode(str) {
			var ta=document.createElement("textarea");
		      ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		      return ta.value;
		}

