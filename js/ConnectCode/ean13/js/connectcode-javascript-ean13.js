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

		
		function DrawHTMLBarcode_EAN13(data,
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
			return DrawBarcode_EAN13(data,
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

            function DrawBarcode_EAN13(data,
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

			  var encodedData=EncodeEAN13(data);	
                    var humanReadableText = Get_Human_Text(data);
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

        	function EncodeEAN13(data)
        	{
            var fontOutput = ConnectCode_Encode_EAN13(data, 0);
            var output = "";
            var pattern = "";
            for (x = 0; x < fontOutput.length; x++)
            {
                switch ((fontOutput.substr(x,1).charCodeAt(0)))
                {
                    case 45:
                        pattern = "wbwbw";
                        break;
                    case 48:
                        pattern = "wwwbbwb";
                        break;
                    case 49:
                        pattern = "wwbbwwb";
                        break;
                    case 50:
                        pattern = "wwbwwbb";
                        break;
                    case 51:
                        pattern = "wbbbbwb";
                        break;
                    case 52:
                        pattern = "wbwwwbb";
                        break;
                    case 53:
                        pattern = "wbbwwwb";
                        break;
                    case 54:
                        pattern = "wbwbbbb";
                        break;
                    case 55:
                        pattern = "wbbbwbb";
                        break;
                    case 56:
                        pattern = "wbbwbbb";
                        break;
                    case 57:
                        pattern = "wwwbwbb";
                        break;

                    //Right
                    case 111:
                        pattern = "wbwwbbb";
                        break;
                    case 112:
                        pattern = "wbbwwbb";
                        break;
                    case 113:
                        pattern = "wwbbwbb";
                        break;
                    case 114:
                        pattern = "wbwwwwb";
                        break;
                    case 115:
                        pattern = "wwbbbwb";
                        break;
                    case 116:
                        pattern = "wbbbwwb";
                        break;
                    case 117:
                        pattern = "wwwwbwb";
                        break;
                    case 118:
                        pattern = "wwbwwwb";
                        break;
                    case 119:
                        pattern = "wwwbwwb";
                        break;
                    case 120:
                        pattern = "wwbwbbb";
                        break;

                    case 97:
                        pattern = "bbbwwbw";
                        break;
                    case 98:
                        pattern = "bbwwbbw";
                        break;
                    case 99:
                        pattern = "bbwbbww";
                        break;
                    case 100:
                        pattern = "bwwwwbw";
                        break;
                    case 101:
                        pattern = "bwbbbww";
                        break;
                    case 102:
                        pattern = "bwwbbbw";
                        break;
                    case 103:
                        pattern = "bwbwwww";
                        break;
                    case 104:
                        pattern = "bwwwbww";
                        break;
                    case 105:
                        pattern = "bwwbwww";
                        break;
                    case 106:
                        pattern = "bbbwbww";
                        break;

                    case 91 : 
                             pattern="bwb";
                             break;
                    case 93: 
                             pattern = "bwb";
                             break;
			  default : break; 	
                }
                output=output+pattern;
            }
            return output;
	      }

		function Get_Human_Text(data)
		{
                   var Result="";
                   var cd="";
                   var filtereddata="";
                         
                   filtereddata = filterInput(data);
                   filteredlength = filtereddata.length;
                                  
                   if (filteredlength > 12)	
			 {
                       filtereddata = filtereddata.substr(0,12);
                   }
               
                   if (filteredlength < 12)
			 {
                       addcharlength = 12 - filtereddata.length;
                       for (x = 0;x<addcharlength;x++)
			     {
                           filtereddata = "0" + filtereddata;
                       }
                   }
               
                   cd = generateCheckDigit(filtereddata);
                   filtereddata = filtereddata + cd;
			 Result=filtereddata;
  		       Result=html_decode(html_escape(Result));	                   
                   return Result;
		}

		function ConnectCode_Encode_EAN13(data,hr)
		{
                   var EAN13PARITYMAP=new Array(10);
                   EAN13PARITYMAP[0]=new Array(6);
                   EAN13PARITYMAP[1]=new Array(6);
                   EAN13PARITYMAP[2]=new Array(6);
                   EAN13PARITYMAP[3]=new Array(6);
                   EAN13PARITYMAP[4]=new Array(6);
                   EAN13PARITYMAP[5]=new Array(6);
                   EAN13PARITYMAP[6]=new Array(6);
                   EAN13PARITYMAP[7]=new Array(6);
                   EAN13PARITYMAP[8]=new Array(6);
                   EAN13PARITYMAP[9]=new Array(6);
                   
                   EAN13PARITYMAP[0][0] = 0;
                   EAN13PARITYMAP[0][1] = 0;
                   EAN13PARITYMAP[0][2] = 0;
                   EAN13PARITYMAP[0][3] = 0;
                   EAN13PARITYMAP[0][4] = 0;
                   EAN13PARITYMAP[0][5] = 0;
                   
                   EAN13PARITYMAP[1][0] = 0;
                   EAN13PARITYMAP[1][1] = 0;
                   EAN13PARITYMAP[1][2] = 1;
                   EAN13PARITYMAP[1][3] = 0;
                   EAN13PARITYMAP[1][4] = 1;
                   EAN13PARITYMAP[1][5] = 1;
                   
                   EAN13PARITYMAP[2][0] = 0;
                   EAN13PARITYMAP[2][1] = 0;
                   EAN13PARITYMAP[2][2] = 1;
                   EAN13PARITYMAP[2][3] = 1;
                   EAN13PARITYMAP[2][4] = 0;
                   EAN13PARITYMAP[2][5] = 1;
                   
                   EAN13PARITYMAP[3][0] = 0;
                   EAN13PARITYMAP[3][1] = 0;
                   EAN13PARITYMAP[3][2] = 1;
                   EAN13PARITYMAP[3][3] = 1;
                   EAN13PARITYMAP[3][4] = 1;
                   EAN13PARITYMAP[3][5] = 0;
                   
                   EAN13PARITYMAP[4][0] = 0;
                   EAN13PARITYMAP[4][1] = 1;
                   EAN13PARITYMAP[4][2] = 0;
                   EAN13PARITYMAP[4][3] = 0;
                   EAN13PARITYMAP[4][4] = 1;
                   EAN13PARITYMAP[4][5] = 1;
                   
                   EAN13PARITYMAP[5][0] = 0;
                   EAN13PARITYMAP[5][1] = 1;
                   EAN13PARITYMAP[5][2] = 1;
                   EAN13PARITYMAP[5][3] = 0;
                   EAN13PARITYMAP[5][4] = 0;
                   EAN13PARITYMAP[5][5] = 1;
                   
                   EAN13PARITYMAP[6][0] = 0;
                   EAN13PARITYMAP[6][1] = 1;
                   EAN13PARITYMAP[6][2] = 1;
                   EAN13PARITYMAP[6][3] = 1;
                   EAN13PARITYMAP[6][4] = 0;
                   EAN13PARITYMAP[6][5] = 0;
                   
                   EAN13PARITYMAP[7][0] = 0;
                   EAN13PARITYMAP[7][1] = 1;
                   EAN13PARITYMAP[7][2] = 0;
                   EAN13PARITYMAP[7][3] = 1;
                   EAN13PARITYMAP[7][4] = 0;
                   EAN13PARITYMAP[7][5] = 1;
                   
                   EAN13PARITYMAP[8][0] = 0;
                   EAN13PARITYMAP[8][1] = 1;
                   EAN13PARITYMAP[8][2] = 0;
                   EAN13PARITYMAP[8][3] = 1;
                   EAN13PARITYMAP[8][4] = 1;
                   EAN13PARITYMAP[8][5] = 0;
                   
                   EAN13PARITYMAP[9][0] = 0;
                   EAN13PARITYMAP[9][1] = 1;
                   EAN13PARITYMAP[9][2] = 1;
                   EAN13PARITYMAP[9][3] = 0;
                   EAN13PARITYMAP[9][4] = 1;
                   EAN13PARITYMAP[9][5] = 0;
               
                   var Result="";
                   var cd="";
                   var filtereddata="";
                         
                   var transformdataleft = "";
                   var transformdataright = "";
                   filtereddata = filterInput(data);
                   filteredlength = filtereddata.length;
                   
               
                   if (filteredlength > 12)	
			 {
                       filtereddata = filtereddata.substr(0,12);
                   }
               
                   if (filteredlength < 12)
			 {
                       addcharlength = 12 - filtereddata.length;
                       for (x = 0;x<addcharlength;x++)
			     {
                           filtereddata = "0" + filtereddata;
                       }
                   }
               
                   cd = generateCheckDigit(filtereddata);
                   filtereddata = filtereddata + cd;
                   var datalength = 0;
                   datalength = filtereddata.length;
               
                   var parityBit = 0;
                   var firstdigit = 0;
                   for (x = 0;x<7;x++)
			 {
                       if (x == 0)
			     {
                           firstdigit = filtereddata.charCodeAt(x) - 48; 
			     }
                       else
                       {
                           parityBit = EAN13PARITYMAP[firstdigit][x - 1];
                           if (parityBit == 0)
				   {
                               transformdataleft = transformdataleft + filtereddata.substr(x,1);
				   }
                           else
				   {
                               transformdataleft = transformdataleft + String.fromCharCode(filtereddata.charCodeAt(x) + 49 + 14);
                           }
                       }   
                   }
                   
                   var transformchar = "";
                   for (x = 7;x<13;x++)
			 {
                       transformchar = String.fromCharCode(filtereddata.charCodeAt(x) + 49);
                       transformdataright = transformdataright + transformchar;
                   }    
                   
                   if (hr == 1)
			 {
                       Result = String.fromCharCode(firstdigit + "!".charCodeAt(0)) + "[" + transformdataleft + "-" + transformdataright + "]"
                   }
			 else
			 {
                       Result = "[" + transformdataleft + "-" + transformdataright + "]"
                   }
  		       Result=html_decode(html_escape(Result));	                   
                   return Result;
		}


		function generateCheckDigit(data)
		{
                 var datalength = 0;
                 var parity = 0;
                 var Sum = 0;
                 var Result = -1;
                 var strResult = "";
                 var barcodechar = "";
                 var barcodevalue = 0;
               
                 datalength = data.length;
               
                 for (x = datalength - 1;x>=0;x--)
		     {
                 
                   barcodevalue = (data.charCodeAt(x) - 48);
                   if ((x % 2) == 1)
			 {
                       Sum = Sum + (3 * barcodevalue);
			 }
                   else
			 {
                       Sum = Sum + barcodevalue;
                   }
                 }
               
                 Result = Sum % 10;
                 if (Result == 0)
		     {
                   Result = 0;
		     }
                 else
		     {
                   Result = 10 - Result;
		     }
                 
                 strResult = String.fromCharCode(Result + 48);
                 return strResult;
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

