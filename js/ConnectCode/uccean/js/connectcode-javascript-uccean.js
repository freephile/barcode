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


		function DrawHTMLBarcode_UCCEAN(data,
						    gs1Compliance,	
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
			return DrawBarcode_UCCEAN(data,
  					       gs1Compliance,
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

		var _gs1_human_text="";	

            function DrawBarcode_UCCEAN(data,
						    gs1Compliance,
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

			  if (gs1Compliance==undefined)
				gs1Compliance=0;
			  else if (gs1Compliance!=0 && gs1Compliance!=1)
				gs1Compliance=0;

			  var encodedData=EncodeUCCEAN(data,gs1Compliance);	
                    var humanReadableText = Get_Human_Text();
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

		function Get_Human_Text()
		{
			return _gs1_human_text;
		}

		function getUCCValue(inputvalue)
            {
            if (inputvalue <= 94+32 && inputvalue >= 0+32)
                inputvalue = inputvalue - 32;
            else if (inputvalue <= 106+32+100 && inputvalue >= 95+32+100)
                inputvalue = inputvalue - 32 - 100;
            else
                inputvalue = -1;

            return inputvalue;
            }

            function EncodeUCCEAN(data,gs1Compliance)
            {
            var fontOutput = ConnectCode_Encode_UCCEAN(data,gs1Compliance);
            var output = "";
            var pattern = "";
            for (x = 0; x < fontOutput.length; x++)
            {
                switch (getUCCValue(fontOutput.substr(x,1).charCodeAt(0)))
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


		function ConnectCode_Encode_UCCEAN(data,GS1Compliance)
		{
                               
                   var cd = "";
                   var Result = "";
                   var replacedata102 = "";
                   var replacedata234 = "";
                   var filtereddata = filterInput(data);
                   filteredlength = filtereddata.length;
                   if (filteredlength > 254)
			 { 
                           filtereddata = filtereddata.substr(0, 254);
                   }
                   
                   replacedata234 = replaceUCCEAN(filtereddata, 234,GS1Compliance);

                   if (detectAllNumbers(replacedata234,GS1Compliance) == 0) 
                   {                   

                       Result = getAutoSwitchingAB(replacedata234);
                       cd = generateCheckDigit_Code128ABAuto(replacedata234);
                       Result = Result + cd;
                       startc = 236;
                       stopc = 238;
                       Result = String.fromCharCode(startc) + Result + String.fromCharCode(stopc);
                   }
                   else
                   {              
                       cd = generateCheckDigit_Code128CAuto(replacedata234);
                   
                       var x = 0;
                       var Skip = 0;
                       while (x < replacedata234.length)
                       {
                           Skip = 0;
                           if (replacedata234.charCodeAt(x) == 234) 
                           {                
                               Result = Result + String.fromCharCode(234);
                               x = x + 1;
                               Skip = 1;
                           }
               
		               var barcodechar1=0;
                           var barcodechar2=0;

                           if (Skip == 0) 
                           {
                              barcodechar1 = 0;
                              barcodechar2 = 0;
                              barcodechar1 = replacedata234.charCodeAt(x);
                              if (x + 1 < replacedata234.length) 
                              {
					    barcodechar2 = replacedata234.charCodeAt(x+1);
                              }
              
                              if (barcodechar1 >= 48 && barcodechar1 <= 57 && barcodechar2 >= 48 && barcodechar2 <= 57) 
                              {
                                      num = parseInt(replacedata234.substr(x,2),10);
                                      Result = Result + getCode128CCharacterAuto(num);
                                      x = x + 2;
                              }
                              else if ((barcodechar1 >= 48 && barcodechar1 <= 57 && barcodechar2 == 234) || (barcodechar1 >= 48 && barcodechar1 <= 57 && barcodechar2 == 0)) 

					{                                              
                                      var CtoB="";
                                      var BtoC="";
                              
                                      CtoB = String.fromCharCode(232);
                                      Result = Result + CtoB;
              
                                      Result = Result + String.fromCharCode(barcodechar1);
                                      x = x + 1;
                                              
                                      BtoC = String.fromCharCode(231);
                                      Result = Result + BtoC;
                              
                              }

                           }
                       }
                       Result = Result + cd;
                       var startc = 237;
                       var stopc = 238;
                       Result = String.fromCharCode(startc) + Result + String.fromCharCode(stopc);
                   }
  		       Result=html_decode(html_escape(Result));	
                   return Result;
		}

               function replaceUCCEAN(data,fncvalue,GS1Compliance) 
               {
                 var replaceUCCEAN="";
                 var Result = "";
                 var datalength = data.length;
                 var forceNULL = 0;
               
                 var x = 0;
                 var numset = 0;
                 var exitx = 0;
                 
                 var startBracketPosition=new Array(8); 
                 var stopBracketPosition=new Array(8); 
                 
                 var aiset=new Array(8); 
                 var dataset=new Array(8); 
		     var barcodechar="";
		     var barcodevalue=0;	                 

		     for (counter = 0;counter<8;counter++)
		     {
                   startBracketPosition[counter] = -1;
                   stopBracketPosition[counter] = -1;
                 }
                 

                 x = 0;
                 while (x < datalength)
                 {
                   var barcodecharx = data.substr(x,1);
                   if (barcodecharx == "(") 
                   {
                        var y = x + 1;
                        exitx = 0;

                               while ((y < datalength) && (exitx == 0))
                               {  
                                 var barcodechary = data.substr(y,1);
                                 if (barcodechary == ")") 
                                 {
                                     startBracketPosition[numset] = x;
                                     stopBracketPosition[numset] = y;
                                     numset = numset + 1;
                                     exitx = 1;
                                 
                                 }
                                 if (exitx == 0) 
                                     y = y + 1;
                                 
                                 
                               }
                         x = y;
                   }
                   x = x + 1;
                 }

                 if (numset == 0) 
                 {
			 forceNULL = 0;
                   replaceUCCEAN =  String.fromCharCode(fncvalue) + data;
                 }
                 else
                 {

                     for (x = 0;x<numset;x++)
			   {
                         aiset[x] = "";
                         dataset[x] = "";
                   
                         if (stopBracketPosition[x] <= startBracketPosition[x])
				 { 
                           forceNULL = 1;
	                     replaceUCCEAN = "";
				   return replaceUCCEAN;
                         }
                   
                         if (stopBracketPosition[x] - 1 == startBracketPosition[x]) 
			       {
                           forceNULL = 1;
	                     replaceUCCEAN = "";
				   return replaceUCCEAN;
                         }
                       for (y = startBracketPosition[x] + 1;y<stopBracketPosition[x];y++)
			     {     
                           barcodechar = data.substr(y,1);
                           barcodevalue = barcodechar.charCodeAt(0);
                           if ((barcodevalue <= 57 && barcodevalue >= 48) || (barcodevalue <= 90 && barcodevalue >= 65) || (barcodevalue <= 122 && barcodevalue >= 97)) 
				   {
                               aiset[x] = aiset[x] + barcodechar;
                           }
                       }
                   
                       if (x == numset - 1) 
                       {
                           for (y = stopBracketPosition[x] + 1;y<data.length;y++)
                           {
                               barcodechar = data.substr(y,1);
                               barcodevalue = barcodechar.charCodeAt(0);
                               if ((barcodevalue <= 57 && barcodevalue >= 48) || (barcodevalue <= 90 && barcodevalue >= 65) || (barcodevalue <= 122 && barcodevalue >= 97)) 
					 {
                                   dataset[x] = dataset[x] + barcodechar;
                               }
                           }
                       }
                       else
                       {
                           for (y = stopBracketPosition[x] + 1;y<startBracketPosition[x + 1];y++)
                           {
                                barcodechar = data.substr(y,1);
                                barcodevalue = barcodechar.charCodeAt(0);
                                if ((barcodevalue <= 57 && barcodevalue >= 48) || (barcodevalue <= 90 && barcodevalue >= 65) || (barcodevalue <= 122 && barcodevalue >= 97)) 
					 {
                                   dataset[x] = dataset[x] + barcodechar;
                               }
                           }
                       
                       }
                     }
                   
                    if (forceNULL == 1) 
			  {	                       
                       replaceUCCEAN = "";
                    }
                    else
                    {   
			   _gs1_human_text="";
                     Result = String.fromCharCode(fncvalue) + Result;
                     fncstring = String.fromCharCode(fncvalue);
                     for (x = 0;x<numset;x++)
                     {
                       if (x == numset - 1) 
			     {
                           Result = Result + aiset[x] + dataset[x];
				   _gs1_human_text = _gs1_human_text + '(' + aiset[x] + ')' + dataset[x]
                       }
                       else
			     {
                  
		               if (GS1Compliance == 0)
				   {
                			Result = Result + aiset[x] + dataset[x] + fncstring;
					_gs1_human_text = _gs1_human_text + '(' + aiset[x] + ')' + dataset[x]
				   }
            		   else
        			   {
		                if (aiset[x] == "8002" || aiset[x] == "8003" || aiset[x] == "8004" || aiset[x] == "8007" || aiset[x] == "8008" || aiset[x] == "8020" || aiset[x] == "240" || aiset[x] == "241" || aiset[x] == "250" || aiset[x] == "251" || aiset[x] == "400" || aiset[x] == "401" || aiset[x] == "403" || aiset[x] == "420" || aiset[x] == "421" || aiset[x] == "423" || aiset[x] == "10" || aiset[x] == "21" || aiset[x] == "22" || aiset[x] == "23" || aiset[x] == "30" || aiset[x] == "37" || aiset[x] == "90" || aiset[x] == "91" || aiset[x] == "92" || aiset[x] == "93" || aiset[x] == "94" || aiset[x] == "95" || aiset[x] == "96" || aiset[x] == "97" || aiset[x] == "98" || aiset[x] == "99")
				    {
            		        Result = Result + aiset[x] + dataset[x] + fncstring;
 					  _gs1_human_text = _gs1_human_text + '(' + aiset[x] + ')' + dataset[x]
				    }
		                else
				    {
            		        Result = Result + aiset[x] + dataset[x];
					  _gs1_human_text = _gs1_human_text + '(' + aiset[x] + ')' + dataset[x]
		                }
                    
            		   }

                       }
                     
                     }
                     replaceUCCEAN = Result; 
                    }
                 
                 }
                 
                 if (forceNULL == 1)
		     { 
                   replaceUCCEAN = "";
                 }

                 return replaceUCCEAN;
               
               }


               function getCode128ABValueAuto(inputchar)  
               {  
               
                   var returnvalue = 0;
               
                   if ((inputchar <= 31) && (inputchar >= 0))  
                       returnvalue = (inputchar + 64);
                   else if ((inputchar <= 127) && (inputchar >= 32))
                       returnvalue = (inputchar - 32);
                   else if (inputchar == 230)  
                       returnvalue = 98;
                   else
                       returnvalue = -1;
                   
                   return returnvalue;
                
               }
               
               
               function getCode128ABCharacterAuto(inputvalue)  
               {
                   if ((inputvalue <= 94) && (inputvalue >= 0))  
                       inputvalue = inputvalue + 32;
                   else if ((inputvalue <= 106) && (inputvalue >= 95))  
                       inputvalue = inputvalue + 100 + 32;
                   else
                       inputvalue = -1;
                   
               
                   return String.fromCharCode(inputvalue);
               
               }
                              
               function getCode128CCharacterAuto(inputvalue)  
               {
               
                   if ((inputvalue <= 94) && (inputvalue >= 0))  
                       inputvalue = inputvalue + 32;
                   else if ((inputvalue <= 106) && (inputvalue >= 95))  
                       inputvalue = inputvalue + 32 + 100;
                   else
                       inputvalue = -1;
                   
                   
                   return String.fromCharCode(inputvalue);
               
               }
               


		function filterInput(data)
		{
			var Result="";
			var datalength=data.length;
			for (x=0;x<datalength;x++)
			{
				if (data.charCodeAt(x)>=0 && data.charCodeAt(x)<=127)
				{
					Result = Result + data.substr(x,1);
				}
			}

			return Result;
		}

		function generateCheckDigit_Code128ABAuto(data)
		{
                 var datalength = 0;
                 var Sum = 104;
                 var Result = -1;
                 var strResult = "";
               
                 datalength = data.length;
                 
                 var num = 0;
                 var Weight = 1;
                 
                 var x = 0;
                 while (x < data.length)
                 {
                   num = ScanAhead_8orMore_Numbers(data, x);
                   if (num >= 8)  
                   {
                     endpoint = x + num;
               
                     var BtoC = 99;
                     Sum = Sum + (BtoC * (Weight));
                     Weight = Weight + 1;
                     
                     while (x < endpoint)
                     {
                       num = parseInt(data.substr(x,2),10);
                       Sum = Sum + (num * (Weight));
                       x = x + 2;
                       Weight = Weight + 1;
               
                     }
                     var CtoB = 100;
                     Sum = Sum + (CtoB * (Weight));
                     Weight = Weight + 1;
                   
                   }
                   else
                   {
                       num = data.charCodeAt(x);
                       Sum = Sum + (getCode128ABValueAuto(num) * (Weight));
                       x = x + 1;
                       Weight = Weight + 1;
                   
                   }
                 }
                 Result = Sum % 103;
                 strResult = getCode128ABCharacterAuto(Result);
                 return strResult;
		}

               function getCode128CCharacter(inputvalue) 
               {
                   if ((inputvalue <= 94) && (inputvalue >= 0))
                       inputvalue = inputvalue + 32;
                   else if ((inputvalue <= 106) && (inputvalue >= 95))
                       inputvalue = inputvalue + 32 + 100;
                   else
                       inputvalue = -1;
               
                   return String.fromCharCode(inputvalue);
               
               
               }

		function generateCheckDigit_Code128CAuto(data)
		{	
                       var datalength = 0;
                       var Sum = 105;
                       var num = 0;
                       var Result = -1;
                       var strResult = "";
                     
                       datalength = data.length;
                     
                       var x = 0;
                       var Weight = 1;
                       var Skip = 0;
                       while (x < data.length)
                       {
                         Skip = 0;
                         if (data.charCodeAt(x) == 234) 
			       {
                             num = 102;
                             Sum = Sum + (num * (Weight));
                             x = x + 1;
                             Weight = Weight + 1;
                             Skip = 1;
                         }    
                                              
                          var barcodechar1=0;
                          var barcodechar2=0;
                          if (Skip == 0) 
                          {
                              barcodechar1 = 0;
                              barcodechar2 = 0;
                              barcodechar1 = data.charCodeAt(x);
                              if (x + 1 < data.length)
					{
                                  barcodechar2 = data.charCodeAt(x+1);
                              }
              
                              if (barcodechar1 >= 48 && barcodechar1 <= 57 && barcodechar2 >= 48 && barcodechar2 <= 57) 
                              {
                                      num = parseInt(data.substr(x,2),10);
                                      Sum = Sum + (num * (Weight));
                                      x = x + 2;
                                      Weight = Weight + 1;
                              }
                              else if ((barcodechar1 >= 48 && barcodechar1 <= 57 && barcodechar2 == 234) || (barcodechar1 >= 48 && barcodechar1 <= 57 && barcodechar2 == 0)) 
                              {                
                                      var CtoB=0;
                                      var BtoC=0;
                              
                                      CtoB = 100;
                                      Sum = Sum + (CtoB * (Weight));
                                      Weight = Weight + 1;
              
                                      num = data.charCodeAt(x);
                                      Sum = Sum + getCode128ABValueAuto(num) * (Weight);
                                      Weight = Weight + 1;
                           
				              BtoC = 99;
                                      Sum = Sum + (BtoC * (Weight));
                                      Weight = Weight + 1;
                                      x = x + 1;
                              
                              }
                          
                          }

                       }
                     
                       Result = Sum % 103;
                       strResult = getCode128CCharacterAuto(Result);
                     
                       return strResult;
		}

               function OptimizeNumbers(data,x,strResult,num)  
               {

                       var BtoC = String.fromCharCode(231);
                       var strResult = strResult + BtoC;
                                   
                       var endpoint = x + num;	
                       while (x < endpoint)
                       {
                           var twonum = parseInt(data.substr(x,2),10);
                           strResult = strResult + getCode128CCharacterAuto(twonum);
                           x = x + 2;
                       }
               
                       var CtoB = String.fromCharCode(232);
                       strResult = strResult + CtoB;
                       return strResult;
               }
               
               function ScanAhead_8orMore_Numbers(data,x)  
               {
                   var numNumbers = 0;
                   var exitx = 0;
                   while ((x < data.length) && (exitx == 0))
                   {
                       var barcodechar = data.substr(x,1);
                       var barcodevalue = barcodechar.charCodeAt(0);
                       if (barcodevalue >= 48 && barcodevalue <= 57)  
                           numNumbers = numNumbers + 1;
                       else
                           exitx = 1;
                       
                       x = x + 1;
                       
                   }
                   if (numNumbers > 8)  
			 {
                       if (numNumbers % 2 == 1)  
                           numNumbers = numNumbers - 1;
                   }
                   return numNumbers;
               
               }

               function getAutoSwitchingAB(data)  
               {
               
                 var datalength = 0;
                 var strResult = "";
                 var shiftchar = String.fromCharCode(230);
               
                 datalength = data.length;
                 var barcodechar="";
                 var x=0;
                 for (x = 0;x<datalength;x++)
		     {                 
                   barcodechar = data.substr(x,1);
                   var barcodevalue = barcodechar.charCodeAt(0);
               

		       if ((barcodevalue <= 31) && (barcodevalue >= 0))
			 {

			        strResult = strResult + shiftchar;
			        barcodevalue = barcodevalue + 96;
			        strResult = strResult + String.fromCharCode(barcodevalue);
			 }
                   else if (barcodevalue == 127)  
                   {
                       barcodechar = String.fromCharCode(barcodechar.charCodeAt(0) + 100);
                       strResult = strResult + barcodechar;
                   }
                   else
                   {

                       num = ScanAhead_8orMore_Numbers(data, x);
                       if (num >= 8)  
                       {       
                           strResult = OptimizeNumbers(data, x, strResult, num);

				   x=x+num;
                           x = x - 1;
                       }
                       else
                           strResult = strResult + barcodechar;
                   }
                   
                 }
                   return strResult;
               
                }
               
               
               function detectAllNumbers(data,GS1Compliance) 
               {
                       var result = "";
                       var allnumbers = 1;
                       var numNumbers = 0;
                       var datalength = data.length;
                     
                       for (x = 0;x<datalength;x++)
			     {
                         var barcodechar = data.substr(x,1);
                         var barcodevalue = barcodechar.charCodeAt(0);
                         
                         if ((barcodevalue <= 57) && (barcodevalue >= 48))
				 {
                             numNumbers = numNumbers + 1;
				 }
                         else if (barcodevalue == 234)
                         {            
                             if (GS1Compliance == 0) 
                             {
                                 if ((numNumbers % 2) == 1)
                                     allnumbers = 0;
                             }
                             numNumbers = 0;
				 }
                         else
                         {
                             allnumbers = 0;
                         }
                       }
                       
			     if (GS1Compliance == 0)
			     {
                         if ((numNumbers % 2) == 1)
                               allnumbers = 0;
                       }
                       return allnumbers;
               
               }
               
               
               function addShift(data)  
               {
                 var datalength = 0;
                 var strResult = "";
                 var shiftchar = String.fromCharCode(230);
               
                 datalength = data.length;
                 
                 for (x = 0;x<datalength;x++)
                 {    
                   var barcodechar = data.substr(x,1);
                   var barcodevalue = barcodechar.charCodeAt(0);
                   if ((barcodevalue <= 31) && (barcodevalue >= 0))  
                   {
                       
                       strResult = strResult + shiftchar;
                       barcodechar = String.fromCharCode(barcodechar.charCodeAt(0) + 96);
                       strResult = strResult + barcodechar;
                   }
                   else
                       strResult = strResult + barcodechar;
                  
               
                   
                 }
                 
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

