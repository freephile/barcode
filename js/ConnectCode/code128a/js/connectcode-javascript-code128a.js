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

		function DrawHTMLBarcode_Code128A(data,
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
			return DrawBarcode_Code128A(data,
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

            function DrawBarcode_Code128A(data,
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

			  var encodedData=EncodeCode128A(data);	
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

		function getCode128AutoValue(inputvalue)
        	{
            if (inputvalue <= 94 + 32 && inputvalue >= 0 + 32)
                inputvalue = inputvalue - 32;
            else if (inputvalue <= 106 + 32 + 100 && inputvalue >= 95 + 32 + 100)
                inputvalue = inputvalue - 32 - 100;
            else
                inputvalue = -1;

            return inputvalue;
	      }
		

		function EncodeCode128A(data)
        	{
            var fontOutput = ConnectCode_Encode_Code128A(data);
            var output = "";
            var pattern = "";
            for (x = 0; x < fontOutput.length; x++)
            {	
                switch (getCode128AutoValue(fontOutput.substr(x,1).charCodeAt(0)))
                {
                    case 0:
                        pattern = "bbwbbwwbbww";
                        break;
                    case 1:
                        pattern = "bbwwbbwbbww";
                        break;
                    case 2:
                        pattern = "bbwwbbwwbbw";
                        break;
                    case 3:
                        pattern = "bwwbwwbbwww";
                        break;
                    case 4:
                        pattern = "bwwbwwwbbww";
                        break;
                    case 5:
                        pattern = "bwwwbwwbbww";
                        break;
                    case 6:
                        pattern = "bwwbbwwbwww";
                        break;
                    case 7:
                        pattern = "bwwbbwwwbww";
                        break;
                    case 8:
                        pattern = "bwwwbbwwbww";
                        break;
                    case 9:
                        pattern = "bbwwbwwbwww";
                        break;
                    case 10:
                        pattern = "bbwwbwwwbww";
                        break;
                    case 11:
                        pattern = "bbwwwbwwbww";
                        break;
                    case 12:
                        pattern = "bwbbwwbbbww";
                        break;
                    case 13:
                        pattern = "bwwbbwbbbww";
                        break;
                    case 14:
                        pattern = "bwwbbwwbbbw";
                        break;
                    case 15:
                        pattern = "bwbbbwwbbww";
                        break;
                    case 16:
                        pattern = "bwwbbbwbbww";
                        break;
                    case 17:
                        pattern = "bwwbbbwwbbw";
                        break;
                    case 18:
                        pattern = "bbwwbbbwwbw";
                        break;
                    case 19:
                        pattern = "bbwwbwbbbww";
                        break;
                    case 20:
                        pattern = "bbwwbwwbbbw";
                        break;
                    case 21:
                        pattern = "bbwbbbwwbww";
                        break;
                    case 22:
                        pattern = "bbwwbbbwbww";
                        break;
                    case 23:
                        pattern = "bbbwbbwbbbw";
                        break;
                    case 24:
                        pattern = "bbbwbwwbbww";
                        break;
                    case 25:
                        pattern = "bbbwwbwbbww";
                        break;
                    case 26:
                        pattern = "bbbwwbwwbbw";
                        break;
                    case 27:
                        pattern = "bbbwbbwwbww";
                        break;
                    case 28:
                        pattern = "bbbwwbbwbww";
                        break;
                    case 29:
                        pattern = "bbbwwbbwwbw";
                        break;
                    case 30:
                        pattern = "bbwbbwbbwww";
                        break;
                    case 31:
                        pattern = "bbwbbwwwbbw";
                        break;
                    case 32:
                        pattern = "bbwwwbbwbbw";
                        break;
                    case 33:
                        pattern = "bwbwwwbbwww";
                        break;
                    case 34:
                        pattern = "bwwwbwbbwww";
                        break;
                    case 35:
                        pattern = "bwwwbwwwbbw";
                        break;
                    case 36:
                        pattern = "bwbbwwwbwww";
                        break;
                    case 37:
                        pattern = "bwwwbbwbwww";
                        break;
                    case 38:
                        pattern = "bwwwbbwwwbw";
                        break;
                    case 39:
                        pattern = "bbwbwwwbwww";
                        break;
                    case 40:
                        pattern = "bbwwwbwbwww";
                        break;
                    case 41:
                        pattern = "bbwwwbwwwbw";
                        break;
                    case 42:
                        pattern = "bwbbwbbbwww";
                        break;
                    case 43:
                        pattern = "bwbbwwwbbbw";
                        break;
                    case 44:
                        pattern = "bwwwbbwbbbw";
                        break;
                    case 45:
                        pattern = "bwbbbwbbwww";
                        break;
                    case 46:
                        pattern = "bwbbbwwwbbw";
                        break;
                    case 47:
                        pattern = "bwwwbbbwbbw";
                        break;
                    case 48:
                        pattern = "bbbwbbbwbbw";
                        break;
                    case 49:
                        pattern = "bbwbwwwbbbw";
                        break;
                    case 50:
                        pattern = "bbwwwbwbbbw";
                        break;
                    case 51:
                        pattern = "bbwbbbwbwww";
                        break;
                    case 52:
                        pattern = "bbwbbbwwwbw";
                        break;
                    case 53:
                        pattern = "bbwbbbwbbbw";
                        break;
                    case 54:
                        pattern = "bbbwbwbbwww";
                        break;
                    case 55:
                        pattern = "bbbwbwwwbbw";
                        break;
                    case 56:
                        pattern = "bbbwwwbwbbw";
                        break;
                    case 57:
                        pattern = "bbbwbbwbwww";
                        break;
                    case 58:
                        pattern = "bbbwbbwwwbw";
                        break;
                    case 59:
                        pattern = "bbbwwwbbwbw";
                        break;
                    case 60:
                        pattern = "bbbwbbbbwbw";
                        break;
                    case 61:
                        pattern = "bbwwbwwwwbw";
                        break;
                    case 62:
                        pattern = "bbbbwwwbwbw";
                        break;
                    case 63:
                        pattern = "bwbwwbbwwww";
                        break;
                    case 64:
                        pattern = "bwbwwwwbbww";
                        break;
                    case 65:
                        pattern = "bwwbwbbwwww";
                        break;
                    case 66:
                        pattern = "bwwbwwwwbbw";
                        break;
                    case 67:
                        pattern = "bwwwwbwbbww";
                        break;
                    case 68:
                        pattern = "bwwwwbwwbbw";
                        break;
                    case 69:
                        pattern = "bwbbwwbwwww";
                        break;
                    case 70:
                        pattern = "bwbbwwwwbww";
                        break;
                    case 71:
                        pattern = "bwwbbwbwwww";
                        break;
                    case 72:
                        pattern = "bwwbbwwwwbw";
                        break;
                    case 73:
                        pattern = "bwwwwbbwbww";
                        break;
                    case 74:
                        pattern = "bwwwwbbwwbw";
                        break;
                    case 75:
                        pattern = "bbwwwwbwwbw";
                        break;
                    case 76:
                        pattern = "bbwwbwbwwww";
                        break;
                    case 77:
                        pattern = "bbbbwbbbwbw";
                        break;
                    case 78:
                        pattern = "bbwwwwbwbww";
                        break;
                    case 79:
                        pattern = "bwwwbbbbwbw";
                        break;
                    case 80:
                        pattern = "bwbwwbbbbww";
                        break;
                    case 81:
                        pattern = "bwwbwbbbbww";
                        break;
                    case 82:
                        pattern = "bwwbwwbbbbw";
                        break;
                    case 83:
                        pattern = "bwbbbbwwbww";
                        break;
                    case 84:
                        pattern = "bwwbbbbwbww";
                        break;
                    case 85:
                        pattern = "bwwbbbbwwbw";
                        break;
                    case 86:
                        pattern = "bbbbwbwwbww";
                        break;
                    case 87:
                        pattern = "bbbbwwbwbww";
                        break;
                    case 88:
                        pattern = "bbbbwwbwwbw";
                        break;
                    case 89:
                        pattern = "bbwbbwbbbbw";
                        break;
                    case 90:
                        pattern = "bbwbbbbwbbw";
                        break;
                    case 91:
                        pattern = "bbbbwbbwbbw";
                        break;
                    case 92:
                        pattern = "bwbwbbbbwww";
                        break;
                    case 93:
                        pattern = "bwbwwwbbbbw";
                        break;
                    case 94:
                        pattern = "bwwwbwbbbbw";
                        break;
                    case 95:
                        pattern = "bwbbbbwbwww";
                        break;
                    case 96:
                        pattern = "bwbbbbwwwbw";
                        break;
                    case 97:
                        pattern = "bbbbwbwbwww";
                        break;
                    case 98:
                        pattern = "bbbbwbwwwbw";
                        break;
                    case 99:
                        pattern = "bwbbbwbbbbw";
                        break;
                    case 100:
                        pattern = "bwbbbbwbbbw";
                        break;
                    case 101:
                        pattern = "bbbwbwbbbbw";
                        break;
                    case 102:
                        pattern = "bbbbwbwbbbw";
                        break;
                    case 103:
                        pattern = "bbwbwwwwbww";
                        break;
                    case 104:
                        pattern = "bbwbwwbwwww";
                        break;
                    case 105:
                        pattern = "bbwbwwbbbww";
                        break;
                    case 106:
                        pattern = "bbwwwbbbwbwbb";
                        break;
			  default : break;
                }
                output=output+pattern;
            }
            return output;
	      }

		function Get_Human_Text(data)
		{
                   var cd = "";
                   var Result = "";
                   var filtereddata = filterInput(data);
                   filteredlength = filtereddata.length;

                   if (filteredlength > 254)
			 {
                       filtereddata = filtereddata.substr(0, 254);
                   }
			 Result=filtereddata;
                   Result=html_decode(html_escape(Result));	
                   return Result;
		}

		function ConnectCode_Encode_Code128A(data)
		{
                   var cd = "";
                   var Result = "";
                   var filtereddata = filterInput(data);
                   filteredlength = filtereddata.length;

                   if (filteredlength > 254)
			 {
                       filtereddata = filtereddata.substr(0, 254);
                   }
                   cd = generateCheckDigit(filtereddata);
                   for (x = 0;x<filtereddata.length;x++)
		       {                 
  				  var c ="";
				  c= translateCharacter(filtereddata.charCodeAt(x));
			        Result = Result + c;
                   }
               
                   Result = Result + cd;
               
                   var startc = 235;
                   var stopc = 238;
                   Result = String.fromCharCode(startc) + Result + String.fromCharCode(stopc);
  		       Result=html_decode(html_escape(Result));	
                   return Result;
		}

		function getCode128ACharacter(inputvalue) {
               
		       if ((inputvalue <= 94) && (inputvalue >= 0))
			 {
                       inputvalue = inputvalue + 32;
			 }
                   else if ((inputvalue <= 106) && (inputvalue >= 95))
			 {
                       inputvalue = inputvalue + 100 + 32;
			 }
                   else
			 {
                       inputvalue = -1;
			 }
               
                   return String.fromCharCode(inputvalue);
		}

            function translateCharacter(inputchar)
            {   

                   var returnvalue = 0;
               
                   if ((inputchar <= 30) && (inputchar >= 0))
			 {
                       returnvalue = (inputchar + 96);
			 }
                   else if (inputchar == 31)
			 {
                       returnvalue = (inputchar + 96 + 100);
			 }
                   else if ((inputchar <= 95) && (inputchar >= 32))
			 {
                       returnvalue = inputchar;
			 }
                   else
			 {
                       returnvalue = -1;
			 }
                   return String.fromCharCode(returnvalue);
               
             }

		function getCode128AValue(inputchar) {
              
                   var returnvalue = 0;
               
                   if ((inputchar <= 31) && (inputchar >= 0))
			 {
                       returnvalue = (inputchar + 64);
			 }
                   else if ((inputchar <= 95) && (inputchar >= 32))
			 {
                       returnvalue = (inputchar - 32);
			 }
                   else
			 {
                       returnvalue = -1;
                   }
               
                   return returnvalue;
   
		}

		function filterInput(data)
		{
			var Result="";
			var datalength=data.length;
			for (x=0;x<datalength;x++)
			{
				if (data.charCodeAt(x)>=0 && data.charCodeAt(x)<=95)
				{
					Result = Result + data.substr(x,1);
				}
			}

			return Result;
		}

		function generateCheckDigit(data)
		{
                 var datalength = 0;
                 var Sum = 103;
                 var Result = -1;
                 var strResult = "";
               
                 datalength = data.length;
               
                 var x = 0;
                 var Weight = 1;
                 var num = 0;
                 
                 for (x = 0 ;x<data.length;x++)
		     { 
                   num = data.charCodeAt(x);
                   Sum = Sum + (getCode128AValue(num) * (Weight));
                   Weight = Weight + 1;
                 }
               
                 Result = Sum % 103;
                 strResult = getCode128ACharacter(Result);
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

