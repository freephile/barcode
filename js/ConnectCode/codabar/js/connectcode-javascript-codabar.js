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

		function DrawHTMLBarcode_Codabar(data,
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
			return DrawBarcode_Codabar(data,
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

            function DrawBarcode_Codabar(data,
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

			  var encodedData=EncodeCodabar(data);	
                    var humanReadableText = ConnectCode_Encode_Codabar(data);
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
				
	      function EncodeCodabar(data)
            {
            var fontOutput = ConnectCode_Encode_Codabar(data);
            var output = "";
            var pattern = "";
            for (x = 0; x < fontOutput.length; x++)
            {
                switch (fontOutput.substr(x,1))
                {
                    case '0':
                        pattern = "tttttwwt";
                        break;
                    case '1':
                        pattern = "ttttwwtt";
                        break;
                    case '2':
                        pattern = "tttwttwt";
                        break;
                    case '3':
                        pattern = "wwtttttt";
                        break;
                    case '4':
                        pattern = "ttwttwtt";
                        break;
                    case '5':
                        pattern = "wttttwtt";
                        break;
                    case '6':
                        pattern = "twttttwt";
                        break;
                    case '7':
                        pattern = "twttwttt";
                        break;
                    case '8':
                        pattern = "twwttttt";
                        break;
                    case '9':
                        pattern = "wttwtttt";
                        break;
	                case '-':
		                pattern = "tttwwttt";
                        break;
                    case '$':
		                pattern = "ttwwtttt";
                        break;
                    case ':':
		                pattern = "wtttwtwt";
                        break;
                    case '/':
		                pattern = "wtwtttwt";
                        break;
                    case '.':
		                pattern = "wtwtwttt";
                        break;
                    case '+':
		                pattern = "ttwtwtwt";
                        break;
                    case 'A':
		                pattern = "ttwwtwtt";
                        break;
                    case 'B':
		                pattern = "twtwttwt";
                        break;
                    case 'C':
		                pattern = "tttwtwwt";
                        break;
                    case 'D':
		                pattern = "tttwwwtt";
                        break;
		  	  default : break;
                   
                }
                output=output+pattern;
            }
            return output;
            }

		function ConnectCode_Encode_Codabar(data)
		{
			var Result="";
			var cd="";
			var filtereddata="";
			filtereddata = filterInput(data);
			var filteredlength = filtereddata.length;
			if (filteredlength > 255)
			{
				filtereddata = filtereddata.substr(0,255);
			}
			Result = filtereddata;
  		      Result=html_decode(html_escape(Result));	
			return Result;
		}

		function getCodeCodabarValue(inputchar) {
			var CODECODABARMAP=new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "-", ".", "$", "/", "+", ":");

			var RVal=-1;
			for (i=0;i<20;i++)
			{
				if (inputchar==CODECODABARMAP[i])
				{
					RVal=i;
				}
			}
			return RVal;
		}

		function filterInput(data)
		{
			var Result="";
			var datalength=data.length;
			for (x=0;x<datalength;x++)
			{
				if (getCodeCodabarValue(data.substr(x,1)) != -1)
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

