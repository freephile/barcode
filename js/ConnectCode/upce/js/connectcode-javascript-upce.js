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


		function DrawHTMLBarcode_UPCE(data,
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
			return DrawBarcode_UPCE(data,
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

            function DrawBarcode_UPCE(data,
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

			  var encodedData=EncodeUPCE(data);	
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

            function EncodeUPCE(data)
            {
            var fontOutput = ConnectCode_Encode_UPCE(data, 0);
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

                    case 123 : //start 
                             pattern="bwb";
                             break;
                    case 125: //stop
                             pattern = "wbwbwb";
                             break;
			  default : break; 
                }
                output=output+pattern;
            }
            return output;
            }

		function Get_Human_Text(data)
		{
               
                   var upcestr = "";
                   var cd = "";
                   var Result = "";
                   var filtereddata = filterInput(data);
                   var transformdata = "";
               
                   filteredlength = filtereddata.length;
               
                   if (filteredlength > 6)
			 {
                       filtereddata = filtereddata.substr(0, 6);
                   }
               
                   if (filteredlength < 6)
			 {
                       addcharlength = 6 - filtereddata.length;
                       for (x = 0;x<addcharlength;x++)
			     {
                           filtereddata = "0" + filtereddata
                       }
                   }
               
                   var datalength = 0;
                   datalength = filtereddata.length;
               
                   var upcastr = "0";
                   lastchar = filtereddata.substr(datalength - 1, 1);
               
                   if ((lastchar.charCodeAt(0) == 48) || (lastchar.charCodeAt(0) == 49) || (lastchar.charCodeAt(0) == 50))
			 {
                       upcastr = upcastr + filtereddata.substr( 0, 2);
                       upcastr = upcastr + lastchar;
                       upcastr = upcastr + "0000";
                       upcastr = upcastr + filtereddata.substr( 2, 3);
                   }
                   else if (lastchar.charCodeAt(0) == 51) 
                   {
                       upcastr = upcastr + filtereddata.substr( 0, 3);
                       upcastr = upcastr + "00000";
                       upcastr = upcastr + filtereddata.substr( 3, 2);
                   }
                   else if (lastchar.charCodeAt(0) == 52) 
                   {
                       upcastr = upcastr + filtereddata.substr( 0, 4);
                       upcastr = upcastr + "00000";
                       upcastr = upcastr + filtereddata.substr( 4, 1);
                   }
                   else if ((lastchar.charCodeAt(0) == 53) || (lastchar.charCodeAt(0) == 54) || (lastchar.charCodeAt(0) == 55) || (lastchar.charCodeAt(0) == 56) || (lastchar.charCodeAt(0) == 57))
                   {
                       upcastr = upcastr + filtereddata.substr( 0, 5);
                       upcastr = upcastr + "0000";
                       upcastr = upcastr + lastchar;
                   }
                   
                   filtereddata = upcastr;
               
                   cd = generateCheckDigit(filtereddata);
               
                   upcestr = upcastr;
                   productvalue = parseInt(upcastr.substr(6, 5),10);
                   if ((upcestr.substr(3, 3) == "000") || (upcestr.substr(3, 3) == "100") || (upcestr.substr(3, 3) == "200"))
                   {
                       if ((productvalue >= 0) && (productvalue <= 999))
                       {
                           thirdch = upcestr.substr(3 , 1);
                           upcestr = DeleteSubString(upcestr, 3, 5);
                           upcestr = InsertSubString(upcestr, thirdch, 6);
			     }
                       else
			     {
                           upcestr = "000000";
                       }
                   }
                   else if (upcestr.substr(4, 2) == "00")
                   {
                       if ((productvalue >= 0) && (productvalue <= 99))
                       {
                           upcestr = DeleteSubString(upcestr, 4, 5);
                           upcestr = InsertSubString(upcestr, "3", 6);
                       }
                       else
			     {
                           upcestr = "000000";
                       }
                   }
                   else if (upcestr.substr(5, 1) == "0")
                   { 

                       if ((productvalue >= 0) && (productvalue <= 9))
                       {
                           upcestr = DeleteSubString(upcestr, 5, 5);
                           upcestr = InsertSubString(upcestr, "4", 6);
                       }
                       else
			     {
                           upcestr = "000000";
                       }
                       
                    } 
                    else if (upcestr.substr(5, 1) != "0") 
                    {
 
                       if ((productvalue >= 5) && (productvalue <= 9))
			     {
                           upcestr = DeleteSubString(upcestr, 6, 4);
                       }
                       else
			     {
                           upcestr = "000000";
                       }                           
                    } 
                    else
			  {
                       upcestr = "000000";
                    }   
                    
                   filtereddata = upcestr;
                 	 Result=filtereddata+cd;
    		       Result=html_decode(html_escape(Result));	
                   return Result;
		}


		function ConnectCode_Encode_UPCE(data,hr)
		{


                   var UPCEPARITYMAP=new Array(10);
			 UPCEPARITYMAP[0]=new Array(2);
			 UPCEPARITYMAP[1]=new Array(2);
			 UPCEPARITYMAP[2]=new Array(2);
			 UPCEPARITYMAP[3]=new Array(2);
			 UPCEPARITYMAP[4]=new Array(2);
			 UPCEPARITYMAP[5]=new Array(2);
			 UPCEPARITYMAP[6]=new Array(2);
			 UPCEPARITYMAP[7]=new Array(2);
			 UPCEPARITYMAP[8]=new Array(2);
			 UPCEPARITYMAP[9]=new Array(2);

			 UPCEPARITYMAP[0][0]=new Array(6);
			 UPCEPARITYMAP[0][1]=new Array(6);
			 UPCEPARITYMAP[1][0]=new Array(6);
			 UPCEPARITYMAP[1][1]=new Array(6);
			 UPCEPARITYMAP[2][0]=new Array(6);
			 UPCEPARITYMAP[2][1]=new Array(6);
			 UPCEPARITYMAP[3][0]=new Array(6);
			 UPCEPARITYMAP[3][1]=new Array(6);
			 UPCEPARITYMAP[4][0]=new Array(6);
			 UPCEPARITYMAP[4][1]=new Array(6);
			 UPCEPARITYMAP[5][0]=new Array(6);
			 UPCEPARITYMAP[5][1]=new Array(6);
			 UPCEPARITYMAP[6][0]=new Array(6);
			 UPCEPARITYMAP[6][1]=new Array(6);
			 UPCEPARITYMAP[7][0]=new Array(6);
			 UPCEPARITYMAP[7][1]=new Array(6);
			 UPCEPARITYMAP[8][0]=new Array(6);
			 UPCEPARITYMAP[8][1]=new Array(6);
			 UPCEPARITYMAP[9][0]=new Array(6);
			 UPCEPARITYMAP[9][1]=new Array(6);

                   UPCEPARITYMAP[0][0][0] = 1;
                   UPCEPARITYMAP[0][0][1] = 1;
                   UPCEPARITYMAP[0][0][2] = 1;
                   UPCEPARITYMAP[0][0][3] = 0;
                   UPCEPARITYMAP[0][0][4] = 0;
                   UPCEPARITYMAP[0][0][5] = 0;
                   
                   UPCEPARITYMAP[0][1][0] = 0;
                   UPCEPARITYMAP[0][1][1] = 0;
                   UPCEPARITYMAP[0][1][2] = 0;
                   UPCEPARITYMAP[0][1][3] = 1;
                   UPCEPARITYMAP[0][1][4] = 1;
                   UPCEPARITYMAP[0][1][5] = 1;
                   
                   
                   UPCEPARITYMAP[1][0][0] = 1;
                   UPCEPARITYMAP[1][0][1] = 1;
                   UPCEPARITYMAP[1][0][2] = 0;
                   UPCEPARITYMAP[1][0][3] = 1;
                   UPCEPARITYMAP[1][0][4] = 0;
                   UPCEPARITYMAP[1][0][5] = 0;
                   
                   UPCEPARITYMAP[1][1][0] = 0;
                   UPCEPARITYMAP[1][1][1] = 0;
                   UPCEPARITYMAP[1][1][2] = 1;
                   UPCEPARITYMAP[1][1][3] = 0;
                   UPCEPARITYMAP[1][1][4] = 1;
                   UPCEPARITYMAP[1][1][5] = 1;
                   
                   
                   UPCEPARITYMAP[2][0][0] = 1;
                   UPCEPARITYMAP[2][0][1] = 1;
                   UPCEPARITYMAP[2][0][2] = 0;
                   UPCEPARITYMAP[2][0][3] = 0;
                   UPCEPARITYMAP[2][0][4] = 1;
                   UPCEPARITYMAP[2][0][5] = 0;
                   
                   UPCEPARITYMAP[2][1][0] = 0;
                   UPCEPARITYMAP[2][1][1] = 0;
                   UPCEPARITYMAP[2][1][2] = 1;
                   UPCEPARITYMAP[2][1][3] = 1;
                   UPCEPARITYMAP[2][1][4] = 0;
                   UPCEPARITYMAP[2][1][5] = 1;
                   
                   UPCEPARITYMAP[3][0][0] = 1;
                   UPCEPARITYMAP[3][0][1] = 1;
                   UPCEPARITYMAP[3][0][2] = 0;
                   UPCEPARITYMAP[3][0][3] = 0;
                   UPCEPARITYMAP[3][0][4] = 0;
                   UPCEPARITYMAP[3][0][5] = 1;
                   
                   UPCEPARITYMAP[3][1][0] = 0;
                   UPCEPARITYMAP[3][1][1] = 0;
                   UPCEPARITYMAP[3][1][2] = 1;
                   UPCEPARITYMAP[3][1][3] = 1;
                   UPCEPARITYMAP[3][1][4] = 1;
                   UPCEPARITYMAP[3][1][5] = 0;
                
                   UPCEPARITYMAP[4][0][0] = 1;
                   UPCEPARITYMAP[4][0][1] = 0;
                   UPCEPARITYMAP[4][0][2] = 1;
                   UPCEPARITYMAP[4][0][3] = 1;
                   UPCEPARITYMAP[4][0][4] = 0;
                   UPCEPARITYMAP[4][0][5] = 0;
                   
                   UPCEPARITYMAP[4][1][0] = 0;
                   UPCEPARITYMAP[4][1][1] = 1;
                   UPCEPARITYMAP[4][1][2] = 0;
                   UPCEPARITYMAP[4][1][3] = 0;
                   UPCEPARITYMAP[4][1][4] = 1;
                   UPCEPARITYMAP[4][1][5] = 1;
                   
                   UPCEPARITYMAP[5][0][0] = 1;
                   UPCEPARITYMAP[5][0][1] = 0;
                   UPCEPARITYMAP[5][0][2] = 0;
                   UPCEPARITYMAP[5][0][3] = 1;
                   UPCEPARITYMAP[5][0][4] = 1;
                   UPCEPARITYMAP[5][0][5] = 0;
                   
                   UPCEPARITYMAP[5][1][0] = 0;
                   UPCEPARITYMAP[5][1][1] = 1;
                   UPCEPARITYMAP[5][1][2] = 1;
                   UPCEPARITYMAP[5][1][3] = 0;
                   UPCEPARITYMAP[5][1][4] = 0;
                   UPCEPARITYMAP[5][1][5] = 1;
                   
                   
                   UPCEPARITYMAP[6][0][0] = 1;
                   UPCEPARITYMAP[6][0][1] = 0;
                   UPCEPARITYMAP[6][0][2] = 0;
                   UPCEPARITYMAP[6][0][3] = 0;
                   UPCEPARITYMAP[6][0][4] = 1;
                   UPCEPARITYMAP[6][0][5] = 1;
                   
                   UPCEPARITYMAP[6][1][0] = 0;
                   UPCEPARITYMAP[6][1][1] = 1;
                   UPCEPARITYMAP[6][1][2] = 1;
                   UPCEPARITYMAP[6][1][3] = 1;
                   UPCEPARITYMAP[6][1][4] = 0;
                   UPCEPARITYMAP[6][1][5] = 0;
                                           
                   UPCEPARITYMAP[7][0][0] = 1;
                   UPCEPARITYMAP[7][0][1] = 0;
                   UPCEPARITYMAP[7][0][2] = 1;
                   UPCEPARITYMAP[7][0][3] = 0;
                   UPCEPARITYMAP[7][0][4] = 1;
                   UPCEPARITYMAP[7][0][5] = 0;
                   
                   UPCEPARITYMAP[7][1][0] = 0;
                   UPCEPARITYMAP[7][1][1] = 1;
                   UPCEPARITYMAP[7][1][2] = 0;
                   UPCEPARITYMAP[7][1][3] = 1;
                   UPCEPARITYMAP[7][1][4] = 0;
                   UPCEPARITYMAP[7][1][5] = 1;
                   
                   UPCEPARITYMAP[8][0][0] = 1;
                   UPCEPARITYMAP[8][0][1] = 0;
                   UPCEPARITYMAP[8][0][2] = 1;
                   UPCEPARITYMAP[8][0][3] = 0;
                   UPCEPARITYMAP[8][0][4] = 0;
                   UPCEPARITYMAP[8][0][5] = 1;
                   
                   UPCEPARITYMAP[8][1][0] = 0;
                   UPCEPARITYMAP[8][1][1] = 1;
                   UPCEPARITYMAP[8][1][2] = 0;
                   UPCEPARITYMAP[8][1][3] = 1;
                   UPCEPARITYMAP[8][1][4] = 1;
                   UPCEPARITYMAP[8][1][5] = 0;
                                           
                   UPCEPARITYMAP[9][0][0] = 1;
                   UPCEPARITYMAP[9][0][1] = 0;
                   UPCEPARITYMAP[9][0][2] = 0;
                   UPCEPARITYMAP[9][0][3] = 1;
                   UPCEPARITYMAP[9][0][4] = 0;
                   UPCEPARITYMAP[9][0][5] = 1;
                   
                   UPCEPARITYMAP[9][1][0] = 0;
                   UPCEPARITYMAP[9][1][1] = 1;
                   UPCEPARITYMAP[9][1][2] = 1;
                   UPCEPARITYMAP[9][1][3] = 0;
                   UPCEPARITYMAP[9][1][4] = 1;
                   UPCEPARITYMAP[9][1][5] = 0;
               
                   var upcestr = "";
                   var cd = "";
                   var Result = "";
                   var filtereddata = filterInput(data);
                   var transformdata = "";
               
                   filteredlength = filtereddata.length;
               
                   if (filteredlength > 6)
			 {
                       filtereddata = filtereddata.substr(0, 6);
                   }
               
                   if (filteredlength < 6)
			 {
                       addcharlength = 6 - filtereddata.length;
                       for (x = 0;x<addcharlength;x++)
			     {
                           filtereddata = "0" + filtereddata
                       }
                   }
               
                   var datalength = 0;
                   datalength = filtereddata.length;
               
                   var upcastr = "0";
                   lastchar = filtereddata.substr(datalength - 1, 1);
               
                   if ((lastchar.charCodeAt(0) == 48) || (lastchar.charCodeAt(0) == 49) || (lastchar.charCodeAt(0) == 50))
			 {
                       upcastr = upcastr + filtereddata.substr( 0, 2);
                       upcastr = upcastr + lastchar;
                       upcastr = upcastr + "0000";
                       upcastr = upcastr + filtereddata.substr( 2, 3);
                   }
                   else if (lastchar.charCodeAt(0) == 51) 
                   {
                       upcastr = upcastr + filtereddata.substr( 0, 3);
                       upcastr = upcastr + "00000";
                       upcastr = upcastr + filtereddata.substr( 3, 2);
                   }
                   else if (lastchar.charCodeAt(0) == 52) 
                   {
                       upcastr = upcastr + filtereddata.substr( 0, 4);
                       upcastr = upcastr + "00000";
                       upcastr = upcastr + filtereddata.substr( 4, 1);
                   }
                   else if ((lastchar.charCodeAt(0) == 53) || (lastchar.charCodeAt(0) == 54) || (lastchar.charCodeAt(0) == 55) || (lastchar.charCodeAt(0) == 56) || (lastchar.charCodeAt(0) == 57))
                   {
                       upcastr = upcastr + filtereddata.substr( 0, 5);
                       upcastr = upcastr + "0000";
                       upcastr = upcastr + lastchar;
                   }
                   
                   filtereddata = upcastr;
               
                   cd = generateCheckDigit(filtereddata);
               
                   upcestr = upcastr;
                   productvalue = parseInt(upcastr.substr(6, 5),10);
                   if ((upcestr.substr(3, 3) == "000") || (upcestr.substr(3, 3) == "100") || (upcestr.substr(3, 3) == "200"))
                   {
                       if ((productvalue >= 0) && (productvalue <= 999))
                       {
                           thirdch = upcestr.substr(3 , 1);
                           upcestr = DeleteSubString(upcestr, 3, 5);
                           upcestr = InsertSubString(upcestr, thirdch, 6);
			     }
                       else
			     {
                           upcestr = "000000";
                       }
                   }
                   else if (upcestr.substr(4, 2) == "00")
                   {
                       if ((productvalue >= 0) && (productvalue <= 99))
                       {
                           upcestr = DeleteSubString(upcestr, 4, 5);
                           upcestr = InsertSubString(upcestr, "3", 6);
                       }
                       else
			     {
                           upcestr = "000000";
                       }
                   }
                   else if (upcestr.substr(5, 1) == "0")
                   { 

                       if ((productvalue >= 0) && (productvalue <= 9))
                       {
                           upcestr = DeleteSubString(upcestr, 5, 5);
                           upcestr = InsertSubString(upcestr, "4", 6);
                       }
                       else
			     {
                           upcestr = "000000";
                       }
                       
                    } 
                    else if (upcestr.substr(5, 1) != "0") 
                    {
 
                       if ((productvalue >= 5) && (productvalue <= 9))
			     {
                           upcestr = DeleteSubString(upcestr, 6, 4);
                       }
                       else
			     {
                           upcestr = "000000";
                       }                           
                    } 
                    else
			  {
                       upcestr = "000000";
                    }   
                    
                   filtereddata = upcestr;
                 
                   var parityBit = 0;
                   var nschar = "0";
                   var chkvalue = (cd.charCodeAt(0) - 48);

               
                   for (x = 1;x<7;x++)
			 {
                       nsvalue = (nschar.charCodeAt(0) - 48);
                       transformchar = filtereddata.substr(x,1);

                       parityBit = UPCEPARITYMAP[chkvalue][nsvalue][x - 1];
                       if (parityBit == 1)
			     {
                           transformchar = String.fromCharCode(transformchar.charCodeAt(0) + 48 + 15);
                       }
                       transformdata = transformdata + transformchar;
                   }    
                    
                   if (hr == 1)
			 {
                       Result = String.fromCharCode(nschar.charCodeAt(0) - 15) + "{" + transformdata + "}" + String.fromCharCode(chkvalue + 48 - 15);
                   }
			 else
			 {
                       Result = "{" + transformdata + "}";
                   }
    		       Result=html_decode(html_escape(Result));	
                   return Result;
		}

		function getUPCECharacter(inputdecimal)
		{
		    return (inputdecimal + 48);
		}

		function generateCheckDigit(data)
		{
                 var datalength = 0;
                 var Sum = 0;
                 var Result = -1;
                 var strResult = "";
                 var barcodechar = "";
                 var barcodevalue = 0;
                 var parity=0;	   
                 datalength = data.length;
               
                 for (x = 0;x<datalength;x++)
		     {
                   
                   barcodevalue = (data.charCodeAt(x) - 48);
               
                   if (parity == 0)
			 {
                       Sum = Sum + (3 * barcodevalue);
			     parity = 1;
			 }
                   else
			 {
                       Sum = Sum + barcodevalue;
			     parity = 0;
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
				if ((data.charCodeAt(x)>=48 && data.charCodeAt(x)<=57))
				{
					Result = Result + data.substr(x,1);
				}
			}
			return Result;
		}

	     function Right(str, n)
	     {
	    	     if (n <= 0)
		       return "";
		     else if (n > String(str).length)
		       return str;
		     else {
		       var iLen = String(str).length;
		       return String(str).substring(iLen, iLen - n);
		     }
		}

            function DeleteSubString(orgStr,start,length)
            {   
                   var fulllength = orgStr.length;
                   var leftstr = "";
                   var rightstr = "";
                   if (start < 1)
			 {
                       start = 1;
                   }
                   
                   leftstr = orgStr.substr(0, start);
                   rightstr = Right(orgStr, fulllength - (start + length));
                   return leftstr + rightstr;
            }
               
            function InsertSubString(orgStr,insertStr,start)
            {   
                   var fulllength = orgStr.length;
                   var leftstr = "";
                   var rightstr = "";
                   
                   if (start < 1)
			 {
                       start = 1;
                   }
                   
                   if (start > fulllength + 1)
			 {
                       start = fulllength + 1
                   }
                   
                   leftstr = orgStr.substr(0, start);
                   rightstr = Right(orgStr, fulllength - start);
                   return leftstr + insertStr + rightstr;
               
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

