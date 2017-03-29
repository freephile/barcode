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

		function DrawHTMLBarcode_EXT2(data,
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
			return DrawBarcode_EXT2(data,
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

            function DrawBarcode_EXT2(data,
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

			  var encodedData=EncodeEXT2(data);	
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

		
            function EncodeEXT2(data)
            {
            var fontOutput = ConnectCode_Encode_EXT2(data);
            var output = "";
            var pattern = "";
            for (x = 0; x < fontOutput.length; x++)
            {
                switch ((fontOutput.substr(x,1).charCodeAt(0)))
                {
                    //Left ODD
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

                 
                    case 60 : //start 
                             pattern="bwbb";
                             break;
                    case 43: //Separator
                             pattern = "wb";
                             break;
			  default: break;
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
                          
                    var transformdataleft = "";
                    var transformdataright = "";
                    filtereddata = filterInput(data);
                    filteredlength = filtereddata.length;
                    
                    if (filteredlength > 2)
			  {
                        filtereddata = filtereddata.substr(0, 2);
                    }
                
                    if (filteredlength < 2 )
			  {                    
                        addcharlength = 2 - filtereddata.length;
                        for (x = 0;x<addcharlength;x++)
				{
                            filtereddata = "0" + filtereddata;
                        }
                    
                    }
                                    
                    Result = filtereddata;
   		        Result=html_decode(html_escape(Result));	
                    return Result;
		}


		function ConnectCode_Encode_EXT2(data)
		{
                    var EXT2PARITYMAP = new Array(4);
			  EXT2PARITYMAP[0]=new Array(2);
			  EXT2PARITYMAP[1]=new Array(2);
			  EXT2PARITYMAP[2]=new Array(2);
			  EXT2PARITYMAP[3]=new Array(2);

                    EXT2PARITYMAP[0][0] = 0;
                    EXT2PARITYMAP[0][1] = 0;
                    
                    EXT2PARITYMAP[1][0] = 0;
                    EXT2PARITYMAP[1][1] = 1;
                    
                    EXT2PARITYMAP[2][0] = 1;
                    EXT2PARITYMAP[2][1] = 0;
                    
                    EXT2PARITYMAP[3][0] = 1;
                    EXT2PARITYMAP[3][1] = 1;
                
                    var Result="";
                    var cd="";
                    var filtereddata="";
                          
                    var transformdataleft = "";
                    var transformdataright = "";
                    filtereddata = filterInput(data);
                    filteredlength = filtereddata.length;
                    
                    if (filteredlength > 2)
			  {
                        filtereddata = filtereddata.substr(0, 2);
                    }
                
                    if (filteredlength < 2 )
			  {                    
                        addcharlength = 2 - filtereddata.length;
                        for (x = 0;x<addcharlength;x++)
				{
                            filtereddata = "0" + filtereddata;
                        }
                    
                    }
                    
                    var Sum = 0;
                    var value1 = 0;
                    var Value2 = 0;
                    parityindex = 0
                    value1 = (filtereddata.charCodeAt(0) - 48) * 10;
                    Value2 = (filtereddata.charCodeAt(1) - 48);
                    Sum = value1 + Value2;
                    var parityindex = Sum % 4;
                
                    var datalength = 0;
                    datalength = filtereddata.length;
                
                    var parityBit = 0;
                    parityBit = EXT2PARITYMAP[parityindex][0];

                    if (parityBit == 0)
			  {
                        transformdataleft = transformdataleft + filtereddata.substr(0,1);
			  }
                    else
			  {
                        transformdataleft = transformdataleft + String.fromCharCode(filtereddata.charCodeAt(0) + 49 + 14);
                    }
                
                    parityBit = EXT2PARITYMAP[parityindex][1];
                    if (parityBit == 0)
			  {
                        transformdataright = transformdataright + filtereddata.substr(1,1);
                    } 
			  else
			  {
                        transformdataright = transformdataright + String.fromCharCode(filtereddata.charCodeAt(1) + 49 + 14);
                    }
                
                    Result = "<" + transformdataleft + "+" + transformdataright;
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

