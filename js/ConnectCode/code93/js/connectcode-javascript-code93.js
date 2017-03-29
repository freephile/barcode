
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

		function DrawHTMLBarcode_Code93(data,
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
			return DrawBarcode_Code93(data,
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

            function DrawBarcode_Code93(data,
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

			  var encodedData=EncodeCode93(data,checkDigit);	
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

		function EncodeCode93(data,chk)
        	{
            var fontOutput = ConnectCode_Encode_Code93(data, chk);
            var output = "";
            var pattern = "";
            for (x = 0; x < fontOutput.length; x++)
            {

                switch (getCode93Value(fontOutput.substr(x,1).charCodeAt(0)))
                {
		                case 0:
			                pattern = "bwwwbwbww";
			                break;
		                case 1:
			                pattern = "bwbwwbwww";
			                break;
		                case 2:
			                pattern = "bwbwwwbww";
			                break;
		                case 3:
			                pattern = "bwbwwwwbw";
			                break;
		                case 4:
			                pattern = "bwwbwbwww";
			                break;
		                case 5:
			                pattern = "bwwbwwbww";
			                break;
		                case 6:
			                pattern = "bwwbwwwbw";
			                break;
		                case 7:
			                pattern = "bwbwbwwww";
			                break;
		                case 8:
			                pattern = "bwwwbwwbw";
			                break;
		                case 9:
			                pattern = "bwwwwbwbw";
			                break;
		                case 10:
			                pattern = "bbwbwbwww";
			                break;
		                case 11:
			                pattern = "bbwbwwbww";
			                break;
		                case 12:
			                pattern = "bbwbwwwbw";
			                break;
		                case 13:
			                pattern = "bbwwbwbww";
			                break;
		                case 14:
			                pattern = "bbwwbwwbw";
			                break;
		                case 15:
			                pattern = "bbwwwbwbw";
			                break;
		                case 16:
			                pattern = "bwbbwbwww";
			                break;
		                case 17:
			                pattern = "bwbbwwbww";
			                break;
		                case 18:
			                pattern = "bwbbwwwbw";
			                break;
		                case 19:
			                pattern = "bwwbbwbww";
			                break;
		                case 20:
			                pattern = "bwwwbbwbw";
			                break;
		                case 21:
			                pattern = "bwbwbbwww";
			                break;
		                case 22:
			                pattern = "bwbwwbbww";
			                break;
		                case 23:
			                pattern = "bwbwwwbbw";
			                break;
		                case 24:
			                pattern = "bwwbwbbww";
			                break;
		                case 25:
			                pattern = "bwwwbwbbw";
			                break;
		                case 26:
			                pattern = "bbwbbwbww";
			                break;
		                case 27:
			                pattern = "bbwbbwwbw";
			                break;
		                case 28:
			                pattern = "bbwbwbbww";
			                break;
		                case 29:
			                pattern = "bbwbwwbbw";
			                break;
		                case 30:
			                pattern = "bbwwbwbbw";
			                break;
		                case 31:
			                pattern = "bbwwbbwbw";
			                break;
		                case 32:
			                pattern = "bwbbwbbww";
			                break;
		                case 33:
			                pattern = "bwbbwwbbw";
			                break;
		                case 34:
			                pattern = "bwwbbwbbw";
			                break;
		                case 35:
			                pattern = "bwwbbbwbw";
			                break;
		                case 36:
			                pattern = "bwwbwbbbw";
			                break;
		                case 37:
			                pattern = "bbbwbwbww";
			                break;
		                case 38:
			                pattern = "bbbwbwwbw";
			                break;
		                case 39:
			                pattern = "bbbwwbwbw";
			                break;
		                case 40:
			                pattern = "bwbbwbbbw";
			                break;
		                case 41:
			                pattern = "bwbbbwbbw";
			                break;
		                case 42:
			                pattern = "bbwbwbbbw";
			                break;
		                case 43:
			                pattern = "bwwbwwbbw";
			                break;
		                case 44:
			                pattern = "bbbwbbwbw";
			                break;
		                case 45:
			                pattern = "bbbwbwbbw";
			                break;
		                case 46:
			                pattern = "bwwbbwwbw";
			                break;
		                case 47:
			                pattern = "bwbwbbbbw";
			                break;
		                case 48:
			                pattern = "bwbwbbbbwb";
			                break;
                        case 197:
                            pattern = "bwbwbbbbw";
                            break;
                        case 198:
                            pattern = "bwbwbbbbwb";
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
				if (filteredlength > 254)
				{
					filtereddata = filtereddata.substr(0,254);
				}
				cd = generateCheckDigit(filtereddata);
			}
			else
			{
				if (filteredlength > 255)
				{
					filtereddata = filtereddata.substr(0,255);
				}
			}
			Result='*'+filtereddata+cd+'*';
  		      Result=html_decode(html_escape(Result));	
			return Result;
		}
				
		function ConnectCode_Encode_Code93(data,checkDigit)
		{
			var Result="";
			var cd="";
			var filtereddata="";
			filtereddata = filterInput(data);
			var filteredlength = filtereddata.length;
			if (checkDigit==1)
			{
				if (filteredlength > 254)
				{
					filtereddata = filtereddata.substr(0,254);
				}
				cd = generateCheckDigit(filtereddata);
			}
			else
			{
				if (filteredlength > 255)
				{
					filtereddata = filtereddata.substr(0,255);
				}
			}

		      var datalength = 0;
		      datalength = filtereddata.length;
    			for (x = 0;x<datalength;x++)
        		{
		        Result = Result + translate_Code93(filtereddata.charCodeAt(x));
		      }

    			Result = String.fromCharCode(197) + Result + cd + String.fromCharCode(198);
  		      Result=html_decode(html_escape(Result));	
			return Result;
		}

		function getCode93Character(inputx) {

                    if ((inputx >= 43) && (inputx <= 46))
			  {
                        inputx = inputx + 150;
			  }
                    else if (inputx == 38)
			  {
                        inputx = 32;
			  }
                    else if (inputx ==39)
			  {
                        inputx = 36;
			  }
                    else if (inputx == 42)
			  {
                        inputx = 37;
			  }
                    else if (inputx == 41)
			  {
                        inputx = 43;
			  }
                    else if (inputx == 36)
			  {
                        inputx = 45;
			  }
                    else if (inputx == 37)
			  {
                        inputx = 46;
			  }
                    else if (inputx == 40)
			  {
                        inputx = 47;
			  }
                    else if ((inputx >= 0) && (inputx <= 9)) 
			  {
                        inputx = inputx + 48;
			  }
                    else if ((inputx >= 10) && (inputx <= 35)) 
			  {
                        inputx = inputx + 55;
			  }
                	  return inputx;
		}

		function getCode93Value(inputx) {
                    if ((inputx >= 193) && (inputx <= 196))
			  {
                        inputx = inputx - 150;
			  }
                    else if (inputx == 32) 
			  {
                        inputx = 38;
			  }
                    else if (inputx == 36) 
			  {
                        inputx = 39;
			  }
                    else if (inputx == 37) 
			  {
                        inputx = 42;
			  }
                    else if (inputx == 43)
			  {
                        inputx = 41;
			  }
                    else if (inputx == 45)
			  {
                        inputx = 36;
			  }
                    else if (inputx == 46)
			  {
                        inputx = 37;
			  }
                    else if (inputx == 47)
			  {
                        inputx = 40;
			  }
                    else if ((inputx >= 48) && (inputx <= 57))
			  {
                        inputx = inputx - 48;
			  }
                    else if ((inputx >= 65) && (inputx <= 90))
			  {
                        inputx = inputx - 55;
                    }
			  return inputx;
		}

		function filterInput(data)
		{
			var Result="";
			var datalength=data.length;
			for (x=0;x<datalength;x++)
			{
				if (data.charCodeAt(x)>=0 && data.charCodeAt(x)<=127 )
				{
					Result = Result + data.substr(x,1);
				}
			}
			return Result;
		}

		function generateCheckDigit(data)
		{
                    var cchk;
                    var kchk;
                    var sumx;
                    var x;
                    var translatedStr;
                    var weight;
                    var code93value;
                    var barcodechar;
                    var forceReturn;
                    
			  cchk=0;	
			  kchk=0;
                    forceReturn = 0;
                    sumx = 0;
                    x = 0;
                    translatedStr = "";
                    weight = 1;
                    code93value = 0;
                    barcodechar="";

                    x = data.length - 1;
                    while (x >= 0)
                    {
                        translatedStr = translate_Code93(data.charCodeAt(x));
                        if (translatedStr.length == 2) 
				{
                            code93value = getCode93Value(translatedStr.charCodeAt(1));
                            
                            if (weight > 20) 
				    {
                                weight = 1;
                            }
                            sumx = sumx + (weight * code93value);
                            weight = weight + 1;
                
                            code93value = getCode93Value(translatedStr.charCodeAt(0));                                                            
				    if (weight > 20)
				    {
                                weight = 1;
                            }

                            sumx = sumx + (weight * code93value);
                            weight = weight + 1;
                        }
                        else if (translatedStr.length == 1)
                        {
                            code93value = getCode93Value(translatedStr.charCodeAt(0));
                            if (weight > 20)
				    {
                                weight = 1;
                            }
                            sumx = sumx + (weight * code93value);
                            weight = weight + 1;
                        }
                        else
				{
                            forceReturn = 1;
                        }
                
                        x = x - 1;

                    }
                
                    cchk = sumx % 47;
                    weight = 2;
                    sumx = sumx % 47;
                    x = data.length - 1;
                    while (x >= 0)
                    {
                        translatedStr = translate_Code93(data.charCodeAt(x));
                        
                        if (translatedStr.length == 2)
				{
                            code93value = getCode93Value(translatedStr.charCodeAt(1))
                            if (weight > 15) 
                            {
					    weight = 1;
                            }
                            sumx = sumx + (weight * code93value);
                            weight = weight + 1;
                
                            code93value = getCode93Value(translatedStr.charCodeAt(0));
                            if (weight > 15)
				    {
                                weight = 1;
                            }
                            sumx = sumx + (weight * code93value);
                            weight = weight + 1;
                        }
                        else if (translatedStr.length == 1)
                        {
                            code93value = getCode93Value(translatedStr.charCodeAt(0))
                            if (weight > 15) 
                            {
					    weight = 1;
                            }
                            sumx = sumx + (weight * code93value);
                            weight = weight + 1;
				}
                        else
				{
                            forceReturn = 1;
                        }
                        x = x - 1;                    
                    }
                    kchk = sumx % 47;
                    
                    if (forceReturn == 1)
			  { 
                        return "";
			  }
                    else
			  {
                        return String.fromCharCode(getCode93Character(cchk)) + String.fromCharCode(getCode93Character(kchk));
                    }
		}

        
            function translate_Code93(inputx)
        	{
            Result = "";
            switch(inputx)
            {
                case 0:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(85);
                    breaks;
                case 1:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(65);
                    breaks;                    
                case 2:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(66);
                    breaks;                    
                case 3:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(67);
                    break;
                case 4:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(68);
                    break;
                case 5:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(69);
                    break;
                case 6:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(70);
                    break;
                case 7:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(71);
                    break;
                case 8:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(72);
                    break;
                case 9:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(73);
                    break;
                case 10:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(74);
                    break;
                case 11:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(75);
                    break;
                case 12:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(76);
                    break;
                case 13:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(77);
                    break;
                case 14:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(78);
                    break;
                case 15:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(79);
                    break;
                case 16:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(80);
                    break;
                case 17:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(81);
                    break;
                case 18:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(82);
                    break;
                case 19:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(83);
                    break;
                case 20:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(84);
                    break;
                case 21:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(85);
                    break;
                case 22:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(86);
                    break;
                case 23:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(87);
                    break;
                case 24:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(88);
                    break;
                case 25:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(89);
                    break;
                case 26:
                    Result = Result + String.fromCharCode(193);
                    Result = Result + String.fromCharCode(90);
                    break;
                case 27:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(65);
                    break;
                case 28:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(66);
                    break;
                case 29:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(67);
                    break;
                case 30:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(68);
                    break;
                case 31:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(69);
                    break;
                case 32:
                    Result = Result + String.fromCharCode(32);
                    break;
                case 33:
                    Result = Result + String.fromCharCode(195);
                    Result = Result + String.fromCharCode(65);
                    break;
                case 34:
                    Result = Result + String.fromCharCode(195);
                    Result = Result + String.fromCharCode(66);
                    break;
                case 35:
                    Result = Result + String.fromCharCode(195);
                    Result = Result + String.fromCharCode(67);
                    break;
                case 36:
                    Result = Result + String.fromCharCode(36);
                    break;
                case 37:
                    Result = Result + String.fromCharCode(37);
                    break;
                case 38:
                    Result = Result + String.fromCharCode(195);
                    Result = Result + String.fromCharCode(70);
                    break;
                case 39:
                    Result = Result + String.fromCharCode(195);
                    Result = Result + String.fromCharCode(71);
                    break;
                case 40:
                    Result = Result + String.fromCharCode(195);
                    Result = Result + String.fromCharCode(72);
                    break;
                case 41:
                    Result = Result + String.fromCharCode(195);
                    Result = Result + String.fromCharCode(73);
                    break;
                case 42:
                    Result = Result + String.fromCharCode(195);
                    Result = Result + String.fromCharCode(74);
                    break;
                case 43:
                    Result = Result + String.fromCharCode(43);
                    break;
                case 44:
                    Result = Result + String.fromCharCode(195);
                    Result = Result + String.fromCharCode(76);
                    break;
                case 45:
                    Result = Result + String.fromCharCode(45);
                    break;
                case 46:
                    Result = Result + String.fromCharCode(46);
                    break;
                case 47:
                    Result = Result + String.fromCharCode(47);
                    break;
                case 48:
                    Result = Result + String.fromCharCode(48);
                    break;
                case 49:
                    Result = Result + String.fromCharCode(49);
                    break;
                case 50:
                    Result = Result + String.fromCharCode(50);
                    break;
                case 51:
                    Result = Result + String.fromCharCode(51);
                    break;
                case 52:
                    Result = Result + String.fromCharCode(52);
                    break;
                case 53:
                    Result = Result + String.fromCharCode(53);
                    break;
                case 54:
                    Result = Result + String.fromCharCode(54);
                    break;
                case 55:
                    Result = Result + String.fromCharCode(55);
                    break;
                case 56:
                    Result = Result + String.fromCharCode(56);
                    break;
                case 57:
                    Result = Result + String.fromCharCode(57);
                    break;
                case 58:
                    Result = Result + String.fromCharCode(195);
                    Result = Result + String.fromCharCode(90);
                    break;
                case 59:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(70);
                    break;
                case 60:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(71);
                    break;
                case 61:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(72);
                    break;
                case 62:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(73);
                    break;
                case 63:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(74);
                    break;
                case 64:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(86);
                    break;
                case 65:
                    Result = Result + String.fromCharCode(65);
                    break;
                case 66:
                    Result = Result + String.fromCharCode(66);
                    break;
                case 67:
                    Result = Result + String.fromCharCode(67);
                    break;
                case 68:
                    Result = Result + String.fromCharCode(68);
                    break;
                case 69:
                    Result = Result + String.fromCharCode(69);
                    break;
                case 70:
                    Result = Result + String.fromCharCode(70);
                    break;
                case 71:
                    Result = Result + String.fromCharCode(71);
                    break;
                case 72:
                    Result = Result + String.fromCharCode(72);
                    break;
                case 73:
                    Result = Result + String.fromCharCode(73);
                    break;
                case 74:
                    Result = Result + String.fromCharCode(74);
                    break;
                case 75:
                    Result = Result + String.fromCharCode(75);
                    break;
                case 76:
                    Result = Result + String.fromCharCode(76);
                    break;
                case 77:
                    Result = Result + String.fromCharCode(77);
                    break;
                case 78:
                    Result = Result + String.fromCharCode(78);
                    break;
                case 79:
                    Result = Result + String.fromCharCode(79);
                    break;
                case 80:
                    Result = Result + String.fromCharCode(80);
                    break;
                case 81:
                    Result = Result + String.fromCharCode(81);
                    break;
                case 82:
                    Result = Result + String.fromCharCode(82);
                    break;
                case 83:
                    Result = Result + String.fromCharCode(83);
                    break;
                case 84:
                    Result = Result + String.fromCharCode(84);
                    break;
                case 85:
                    Result = Result + String.fromCharCode(85);
                    break;
                case 86:
                    Result = Result + String.fromCharCode(86);
                    break;
                case 87:
                    Result = Result + String.fromCharCode(87);
                    break;
                case 88:
                    Result = Result + String.fromCharCode(88);
                    break;
                case 89:
                    Result = Result + String.fromCharCode(89);
                    break;
                case 90:
                    Result = Result + String.fromCharCode(90);
                    break;
                case 91:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(75);
                    break;
                case 92:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(76);
                    break;
                case 93:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(77);
                    break;
                case 94:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(78);
                    break;
                case 95:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(79);
                    break;
                case 96:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(87);
                    break;
                case 97:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(65);
                    break;
                case 98:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(66);
                    break;
                case 99:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(67);
                    break;
                case 100:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(68);
                    break;
                case 101:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(69);
                    break;
                case 102:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(70);
                    break;
                case 103:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(71);
                    break;
                case 104:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(72);
                    break;
                case 105:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(73);
                    break;
                case 106:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(74);
                    break;
                case 107:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(75);
                    break;
                case 108:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(76);
                    break;
                case 109:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(77);
                    break;
                case 110:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(78);
                    break;
                case 111:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(79);
                    break;
                case 112:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(80);
                    break;
                case 113:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(81);
                    break;
                case 114:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(82);
                    break;
                case 115:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(83);
                    break;
                case 116:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(84);
                    break;
                case 117:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(85);
                    break;
                case 118:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(86);
                    break;
                case 119:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(87);
                    break;
                case 120:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(88);
                    break;
                case 121:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(89);
                    break;
                case 122:
                    Result = Result + String.fromCharCode(196);
                    Result = Result + String.fromCharCode(90);
                    break;
                case 123:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(80);
                    break;
                case 124:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(81);
                    break;
                case 125:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(82);
                    break;
                case 126:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(83);
                    break;
                case 127:
                    Result = Result + String.fromCharCode(194);
                    Result = Result + String.fromCharCode(84);
                    break;
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

