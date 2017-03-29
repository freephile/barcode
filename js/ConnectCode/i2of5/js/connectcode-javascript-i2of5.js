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

		function DrawHTMLBarcode_I2OF5(data,
						    checkDigit,
						    humanReadable,
						    units,
						    minBarWidth,
						    width,height,
						    barWidthRatio,
						    textLocation,
						    textAlignment,
						    textStyle,
						    foreColor,
						    backColor)
		{
			return DrawBarcode_I2OF5(data,
						 checkDigit,
						 humanReadable,
						 units,
						 minBarWidth,
						 width,height,
						 barWidthRatio,
						 textLocation,
						 textAlignment,
						 textStyle,
						 foreColor,
						 backColor,
						 "html");
		}

            function DrawBarcode_I2OF5(data,
						    checkDigit,
						    humanReadable,
						    units,
						    minBarWidth,
						    width,height,
						    barWidthRatio,
						    textLocation,
						    textAlignment,
						    textStyle,
						    foreColor,
						    backColor,mode)
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
			  if (barWidthRatio==undefined)
				barWidthRatio=3;			  
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

			  var encodedData=EncodeI2OF5(data,checkDigit);	
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
                    if (barWidthRatio >= 2 && barWidthRatio <= 3)
                    {
                    }
                    else
                        barWidthRatio = 3;

                    for (x = 0; x < encodedData.length; x++)
                    {
                        if (encodedData.substr(x,1) == 't')
                        {
                            thinLength++;
                            encodedLength++;
                        }
                        else if (encodedData.substr(x,1) == 'w')
                        {
                            thickLength = thickLength + barWidthRatio;
                            encodedLength = encodedLength + 3;
                        }
                    }
                    totalLength = totalLength + thinLength + thickLength;

                    if (minBarWidth > 0)
                    {
                        barWidth = minBarWidth.toFixed(2);
                        width=barWidth * totalLength;
                    }
                    else
                        barWidth = (width / totalLength).toFixed(2);

                    thickWidth = barWidth * 3;
                    if (barWidthRatio >= 2 && barWidthRatio <= 3.0)
                    {
                        thickWidth = barWidth * barWidthRatio;
                    }
	
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
                        if (swing == 0)
                            brush = backColor;
                        else
                            brush = foreColor;

                        if (encodedData.substr(x,1) == 't')
                        {
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
                        else if (encodedData.substr(x,1) == 'w')
                        {
				  if (mode=="html")
				    result=result
					     +'<span style="border-left :'
					     +thickWidth
					     +units+' solid ' 
					     +brush
					     +';height:'
					     +height
					     +units+';display:inline-block;"></span>';
	                    incrementWidth = incrementWidth + thickWidth;
				}

                        if (swing == 0)
                            swing = 1;
                        else
                            swing = 0;
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
		
        	function getI2of5Value(iv)
        	{
		var inputvalue=iv.charCodeAt(0);
            if (inputvalue <= 90+32 && inputvalue >= 0+32)
                inputvalue = inputvalue - 32;
            else if (inputvalue <= 99+100 && inputvalue >= 91+100)
                inputvalue = inputvalue - 100;
            else
                inputvalue = -1;

            return inputvalue;
	      }

		function EncodeI2OF5(data,chk)
        	{
            var fontOutput = ConnectCode_Encode_I2OF5(data, chk);
            var output = "";
            var pattern = "";
            for (x = 0; x < fontOutput.length; x++)
            {
                pattern = ""; 
                switch (getI2of5Value(fontOutput.substr(x,1)))
                {
		            case 0:
			            pattern = "ttttwwwwtt";
			            break;
		            case 1:
			            pattern = "twttwtwttw";
			            break;
		            case 2:
			            pattern = "tttwwtwttw";
			            break;
		            case 3:
			            pattern = "twtwwtwttt";
			            break;
		            case 4:
			            pattern = "ttttwwwttw";
			            break;
		            case 5:
			            pattern = "twttwwwttt";
			            break;
		            case 6:
			            pattern = "tttwwwwttt";
			            break;
		            case 7:
			            pattern = "ttttwtwwtw";
			            break;
		            case 8:
			            pattern = "twttwtwwtt";
			            break;
		            case 9:
			            pattern = "tttwwtwwtt";
			            break;
		            case 10:
			            pattern = "wttttwtwwt";
			            break;
		            case 11:
			            pattern = "wwttttttww";
			            break;
		            case 12:
			            pattern = "wttwttttww";
			            break;
		            case 13:
			            pattern = "wwtwttttwt";
			            break;
		            case 14:
			            pattern = "wttttwttww";
			            break;
		            case 15:
			            pattern = "wwtttwttwt";
			            break;
		            case 16:
			            pattern = "wttwtwttwt";
			            break;
		            case 17:
			            pattern = "wttttttwww";
			            break;
		            case 18:
			            pattern = "wwtttttwwt";
			            break;
		            case 19:
			            pattern = "wttwtttwwt";
			            break;
		            case 20:
			            pattern = "ttwttwtwwt";
			            break;
		            case 21:
			            pattern = "twwtttttww";
			            break;
		            case 22:
			            pattern = "ttwwttttww";
			            break;
		            case 23:
			            pattern = "twwwttttwt";
			            break;
		            case 24:
			            pattern = "ttwttwttww";
			            break;
		            case 25:
			            pattern = "twwttwttwt";
			            break;
		            case 26:
			            pattern = "ttwwtwttwt";
			            break;
		            case 27:
			            pattern = "ttwttttwww";
			            break;
		            case 28:
			            pattern = "twwttttwwt";
			            break;
		            case 29:
			            pattern = "ttwwtttwwt";
			            break;
		            case 30:
			            pattern = "wtwttwtwtt";
			            break;
		            case 31:
			            pattern = "wwwttttttw";
			            break;
		            case 32:
			            pattern = "wtwwtttttw";
			            break;
		            case 33:
			            pattern = "wwwwtttttt";
			            break;
		            case 34:
			            pattern = "wtwttwtttw";
			            break;
		            case 35:
			            pattern = "wwwttwtttt";
			            break;
		            case 36:
			            pattern = "wtwwtwtttt";
			            break;
		            case 37:
			            pattern = "wtwttttwtw";
			            break;
		            case 38:
			            pattern = "wwwttttwtt";
			            break;
		            case 39:
			            pattern = "wtwwtttwtt";
			            break;
		            case 40:
			            pattern = "ttttwwtwwt";
			            break;
		            case 41:
			            pattern = "twttwtttww";
			            break;
		            case 42:
			            pattern = "tttwwtttww";
			            break;
		            case 43:
			            pattern = "twtwwtttwt";
			            break;
		            case 44:
			            pattern = "ttttwwttww";
			            break;
		            case 45:
			            pattern = "twttwwttwt";
			            break;
		            case 46:
			            pattern = "tttwwwttwt";
			            break;
		            case 47:
			            pattern = "ttttwttwww";
			            break;
		            case 48:
			            pattern = "twttwttwwt";
			            break;
		            case 49:
			            pattern = "tttwwttwwt";
			            break;
		            case 50:
			            pattern = "wtttwwtwtt";
			            break;
		            case 51:
			            pattern = "wwttwttttw";
			            break;
		            case 52:
			            pattern = "wttwwttttw";
			            break;
		            case 53:
			            pattern = "wwtwwttttt";
			            break;
		            case 54:
			            pattern = "wtttwwtttw";
			            break;
		            case 55:
			            pattern = "wwttwwtttt";
			            break;
		            case 56:
			            pattern = "wttwwwtttt";
			            break;
		            case 57:
			            pattern = "wtttwttwtw";
			            break;
		            case 58:
			            pattern = "wwttwttwtt";
			            break;
		            case 59:
			            pattern = "wttwwttwtt";
			            break;
		            case 60:
			            pattern = "ttwtwwtwtt";
			            break;
		            case 61:
			            pattern = "twwtwttttw";
			            break;
		            case 62:
			            pattern = "ttwwwttttw";
			            break;
		            case 63:
			            pattern = "twwwwttttt";
			            break;
		            case 64:
			            pattern = "ttwtwwtttw";
			            break;
		            case 65:
			            pattern = "twwtwwtttt";
			            break;
		            case 66:
			            pattern = "ttwwwwtttt";
			            break;
		            case 67:
			            pattern = "ttwtwttwtw";
			            break;
		            case 68:
			            pattern = "twwtwttwtt";
			            break;
		            case 69:
			            pattern = "ttwwwttwtt";
			            break;
		            case 70:
			            pattern = "tttttwwwwt";
			            break;
		            case 71:
			            pattern = "twttttwtww";
			            break;
		            case 72:
			            pattern = "tttwttwtww";
			            break;
		            case 73:
			            pattern = "twtwttwtwt";
			            break;
		            case 74:
			            pattern = "tttttwwtww";
			            break;
		            case 75:
			            pattern = "twtttwwtwt";
			            break;
		            case 76:
			            pattern = "tttwtwwtwt";
			            break;
		            case 77:
			            pattern = "ttttttwwww";
			            break;
		            case 78:
			            pattern = "twttttwwwt";
			            break;
		            case 79:
			            pattern = "tttwttwwwt";
			            break;
		            case 80:
			            pattern = "wttttwwwtt";
			            break;
		            case 81:
			            pattern = "wwttttwttw";
			            break;
		            case 82:
			            pattern = "wttwttwttw";
			            break;
		            case 83:
			            pattern = "wwtwttwttt";
			            break;
		            case 84:
			            pattern = "wttttwwttw";
			            break;
		            case 85:
			            pattern = "wwtttwwttt";
			            break;
		            case 86:
			            pattern = "wttwtwwttt";
			            break;
		            case 87:
			            pattern = "wtttttwwtw";
			            break;
		            case 88:
			            pattern = "wwttttwwtt";
			            break;
		            case 89:
			            pattern = "wttwttwwtt";
			            break;
		            case 90:
			            pattern = "ttwttwwwtt";
			            break;
		            case 91:
			            pattern = "twwtttwttw";
			            break;
		            case 92:
			            pattern = "ttwwttwttw";
			            break;
		            case 93:
			            pattern = "twwwttwttt";
			            break;
		            case 94:
			            pattern = "ttwttwwttw";
			            break;
		            case 95:
			            pattern = "twwttwwttt";
			            break;
		            case 96:
			            pattern = "ttwwtwwttt";
			            break;
		            case 97:
			            pattern = "ttwtttwwtw";
			            break;
		            case 98:
			            pattern = "twwtttwwtt";
			            break;
		            case 99:
			            pattern = "ttwwttwwtt";
			            break;
				default : break;
                }
                output=output+pattern;
            }
            return "tttt"+output+"wtt";
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
				if (filteredlength > 253)
				{
					filtereddata = filtereddata.substr(0,253);
				}
				
				if (filtereddata.length % 2 ==0)
				{
			            filtereddata = "0" + filtereddata
				}

				cd = generateCheckDigit(filtereddata);
			}
			else
			{
				if (filteredlength > 254)
				{
					filtereddata = filtereddata.substr(0,254);
				}
				if (filtereddata.length % 2 ==1)
				{
			            filtereddata = "0" + filtereddata
				}

			}
			filtereddata = filtereddata+cd;

			Result = filtereddata;
  		      Result=html_decode(html_escape(Result));	
			return Result;
		}

		function ConnectCode_Encode_I2OF5(data,checkDigit)
		{
			var Result="";
			var cd="";
			var filtereddata="";
			filtereddata = filterInput(data);
			var filteredlength = filtereddata.length;
			if (checkDigit==1)
			{
				if (filteredlength > 253)
				{
					filtereddata = filtereddata.substr(0,253);
				}
				
				if (filtereddata.length % 2 ==0)
				{
			            filtereddata = "0" + filtereddata
				}

				cd = generateCheckDigit(filtereddata);
			}
			else
			{
				if (filteredlength > 254)
				{
					filtereddata = filtereddata.substr(0,254);
				}
				if (filtereddata.length % 2 ==1)
				{
			            filtereddata = "0" + filtereddata
				}

			}
			filtereddata = filtereddata+cd;

		      var num = 0;
    			for (x=0;x<filtereddata.length;x=x+2)
			{
		        num = parseInt(filtereddata.substr(x,2),10);
		        Result = Result + getI2of5Character(num)
    			}
			Result = "{" + Result + "}";
  		      Result=html_decode(html_escape(Result));	
			return Result;
		}


		function getI2of5Character(inputvalue) 
            {
		    if ((inputvalue <= 90) && (inputvalue >= 0))
		    {
		        inputvalue = inputvalue + 32;
		    }
		    else if ((inputvalue <= 99) && (inputvalue >= 91))
		    {
		        inputvalue = inputvalue + 100;
		    }
		    else
		    {
		        inputvalue = -1;
		    }
		    return String.fromCharCode(inputvalue);
		}

		function filterInput(data)
		{
			var Result="";
			var datalength=data.length;
			for (x=0;x<datalength;x++)
			{
				if ((data.charCodeAt(x)>=48) && (data.charCodeAt(x)<=57))
				{
					Result = Result + data.substr(x,1);
				}
			}

			return Result;
		}

		function generateCheckDigit(data)
		{
		     var datalength = 0;
                 var lastcharpos = 0;
                 var Result = 0;
                 var strResult = "";
                 var barcodechar = "";
                 var barcodevalue = 0;
                 var toggle = 1;
                 var sum = 0;
               
                 datalength = data.length;
                 lastcharpos = datalength - 1;
               
                 for (x = lastcharpos ; x>=0 ; x--)
                 {
                     barcodevalue = data.charCodeAt(x)-48;
                     
                     if (toggle == 1)
			   {
                           sum = sum + (barcodevalue * 3);
                           toggle = 0;
                     }
			   else
			   {
                           sum = sum + barcodevalue;
                           toggle = 1;
                     }
                 }
                 if ((sum % 10) == 0)
		     {
                       Result = 48;
                 }
		     else
                 {
		           Result = (10 - (sum % 10)) + 48;
                 }
               
                 strResult = String.fromCharCode(Result);
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

