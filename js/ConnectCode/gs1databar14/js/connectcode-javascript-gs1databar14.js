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

		function DrawHTMLBarcode_GS1Databar14(data,
						    linkage,	
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
			return DrawBarcode_GS1Databar14(data,
  					       linkage,
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
		var _gs1d_human_text="";
            function DrawBarcode_GS1Databar14(data,
						    linkage,
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

			  if (linkage==undefined)
				linkage=0;
			  else if (linkage!=0 && linkage!=1)
				linkage=0;

			  var encodedData=ConnectCode_Encode_GS1Databar14(data,linkage);	
                    var humanReadableText = _gs1d_human_text;
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

			  for (x = 0; x < encodedData.length; x++)
                    {
                        if (encodedData.substr(x,1) == 'A' || encodedData.substr(x,1) == 'a')
                            encodedLength++;
                        if (encodedData.substr(x,1) == 'B' || encodedData.substr(x,1) == 'b')
                            encodedLength = encodedLength + 2;
                        if (encodedData.substr(x,1) == 'C' || encodedData.substr(x,1) == 'c')
                            encodedLength = encodedLength + 3;
                        if (encodedData.substr(x,1) == 'D' || encodedData.substr(x,1) == 'd')
                            encodedLength = encodedLength + 4;
                        if (encodedData.substr(x,1) == 'E' || encodedData.substr(x,1) == 'e')
                            encodedLength = encodedLength + 5;
                        if (encodedData.substr(x,1) == 'F' || encodedData.substr(x,1) == 'f')
                            encodedLength = encodedLength + 6;
                        if (encodedData.substr(x,1) == 'G' || encodedData.substr(x,1) == 'g')
                            encodedLength = encodedLength + 7;
                        if (encodedData.substr(x,1) == 'H' || encodedData.substr(x,1) == 'h')
                            encodedLength = encodedLength + 8;
                        if (encodedData.substr(x,1) == 'I' || encodedData.substr(x,1) == 'i')
                            encodedLength = encodedLength + 9;
                    }

			  //encodedLength=encodedData.length;
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

				if (encodedData.substr(x,1) == 'A' || 
				    encodedData.substr(x,1) == 'B' || 
				    encodedData.substr(x,1) == 'C' || 
				    encodedData.substr(x,1) == 'D' || 
				    encodedData.substr(x,1) == 'E' || 
				    encodedData.substr(x,1) == 'F' || 
				    encodedData.substr(x,1) == 'G' || 
				    encodedData.substr(x,1) == 'H' || 
				    encodedData.substr(x,1) == 'I')
                           brush = foreColor;
				else
                           brush = backColor;                        

			      if (mode=="html")
				{
				    var varBarWidt=0;	
	                      if (encodedData.substr(x,1) == 'a' || encodedData.substr(x,1) == 'A')
      	                      varBarWidth = (barWidth) * 1;
            	          if (encodedData.substr(x,1) == 'b' || encodedData.substr(x,1) == 'B')
                            	    varBarWidth = (barWidth) * 2;
                  	    if (encodedData.substr(x,1) == 'c' || encodedData.substr(x,1) == 'C')
	                            varBarWidth = (barWidth) * 3;
                            if (encodedData.substr(x,1) == 'd' || encodedData.substr(x,1) == 'D')
      	                      varBarWidth = (barWidth) * 4;
                            if (encodedData.substr(x,1) == 'e' || encodedData.substr(x,1) == 'E')
            	                varBarWidth = (barWidth) * 5;
                            if (encodedData.substr(x,1) == 'f' || encodedData.substr(x,1) == 'F')
                  	          varBarWidth = (barWidth) * 6;
                            if (encodedData.substr(x,1) == 'g' || encodedData.substr(x,1) == 'G')
                        	    varBarWidth = (barWidth) * 7;
                            if (encodedData.substr(x,1) == 'h' || encodedData.substr(x,1) == 'H')
	                            varBarWidth = (barWidth) * 8;
                            if (encodedData.substr(x,1) == 'i' || encodedData.substr(x,1) == 'I')
      	                      varBarWidth = (barWidth) * 9;

				    result=result
					     +'<span style="border-left:'
					     +varBarWidth
					     +units
					     +' solid ' 
					     +brush
					     +';height:'
					     +height
					     +units+';display:inline-block;"></span>';
				}
			      incrementWidth = incrementWidth + varBarWidth;
				
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

		function ConnectCode_Encode_GS1Databar14( data , linkage) 
            {  
                  var result=""; 
                  var cd=""; 
                  var filtereddata=""; 
                  var addcharlength=0;
                  var humanText=""; 
                  var x=0; 
                  var leftstr="", rightstr="";
                  var valuez=0, leftz=0, rightz=0;
                  var tempasc=0; 
                  var left=0, right=0, data1=0, data2=0, data3=0, data4=0, sum=0, cleft=0, cright=0, ctemp=0, checksumval=0; 
                  var widths=new Array();
                  var tempChar=""; 
                  var bwresult=""; 
                  var black=0; 
                  var retval=0; 
        
                  var checksum=new Array(4);
			checksum[0]=new Array(8);
			checksum[1]=new Array(8);
			checksum[2]=new Array(8);
			checksum[3]=new Array(8);

                  var GS1DATABAR14FINDERS=new Array(9);
			GS1DATABAR14FINDERS[0]=new Array(5);
			GS1DATABAR14FINDERS[1]=new Array(5);
			GS1DATABAR14FINDERS[2]=new Array(5);
			GS1DATABAR14FINDERS[3]=new Array(5);
			GS1DATABAR14FINDERS[4]=new Array(5);
			GS1DATABAR14FINDERS[5]=new Array(5);
			GS1DATABAR14FINDERS[6]=new Array(5);
			GS1DATABAR14FINDERS[7]=new Array(5);
			GS1DATABAR14FINDERS[8]=new Array(5);
                  
                  var widthsodd=new Array(4); 
                  var widthseven=new Array(4); 
                  var results1odd=new Array(4); 
                  var results2odd=new Array(4);
                  var results3odd=new Array(4); 
                  var results4odd=new Array(4); 
                  
                  var results1even=new Array(4); 
                  var results2even=new Array(4); 
                  var results3even=new Array(4); 
                  var results4even=new Array(4); 
                  
                  checksum[0][0] = 1;
                  checksum[0][1] = 3;
                  checksum[0][2] = 9;
                  checksum[0][3] = 27;
                  checksum[0][4] = 2;
                  checksum[0][5] = 6;
                  checksum[0][6] = 18;
                  checksum[0][7] = 54;
                  
                  checksum[1][0] = 4;
                  checksum[1][1] = 12;
                  checksum[1][2] = 36;
                  checksum[1][3] = 29;
                  checksum[1][4] = 8;
                  checksum[1][5] = 24;
                  checksum[1][6] = 72;
                  checksum[1][7] = 58;
                  
                  checksum[2][0] = 16;
                  checksum[2][1] = 48;
                  checksum[2][2] = 65;
                  checksum[2][3] = 37;
                  checksum[2][4] = 32;
                  checksum[2][5] = 17;
                  checksum[2][6] = 51;
                  checksum[2][7] = 74;
                  
                  checksum[3][0] = 64;
                  checksum[3][1] = 34;
                  checksum[3][2] = 23;
                  checksum[3][3] = 69;
                  checksum[3][4] = 49;
                  checksum[3][5] = 68;
                  checksum[3][6] = 46;
                  checksum[3][7] = 59;
                  
                  
                  GS1DATABAR14FINDERS[0][0] = 3;
                  GS1DATABAR14FINDERS[0][1] = 8;
                  GS1DATABAR14FINDERS[0][2] = 2;
                  GS1DATABAR14FINDERS[0][3] = 1;
                  GS1DATABAR14FINDERS[0][4] = 1;
                  
                  GS1DATABAR14FINDERS[1][0] = 3;
                  GS1DATABAR14FINDERS[1][1] = 5;
                  GS1DATABAR14FINDERS[1][2] = 5;
                  GS1DATABAR14FINDERS[1][3] = 1;
                  GS1DATABAR14FINDERS[1][4] = 1;
                  
                  GS1DATABAR14FINDERS[2][0] = 3;
                  GS1DATABAR14FINDERS[2][1] = 3;
                  GS1DATABAR14FINDERS[2][2] = 7;
                  GS1DATABAR14FINDERS[2][3] = 1;
                  GS1DATABAR14FINDERS[2][4] = 1;
                      
                  GS1DATABAR14FINDERS[3][0] = 3;
                  GS1DATABAR14FINDERS[3][1] = 1;
                  GS1DATABAR14FINDERS[3][2] = 9;
                  GS1DATABAR14FINDERS[3][3] = 1;
                  GS1DATABAR14FINDERS[3][4] = 1;
                  
                  GS1DATABAR14FINDERS[4][0] = 2;
                  GS1DATABAR14FINDERS[4][1] = 7;
                  GS1DATABAR14FINDERS[4][2] = 4;
                  GS1DATABAR14FINDERS[4][3] = 1;
                  GS1DATABAR14FINDERS[4][4] = 1;
                  
                  GS1DATABAR14FINDERS[5][0] = 2;
                  GS1DATABAR14FINDERS[5][1] = 5;
                  GS1DATABAR14FINDERS[5][2] = 6;
                  GS1DATABAR14FINDERS[5][3] = 1;
                  GS1DATABAR14FINDERS[5][4] = 1;
                  
                  GS1DATABAR14FINDERS[6][0] = 2;
                  GS1DATABAR14FINDERS[6][1] = 3;
                  GS1DATABAR14FINDERS[6][2] = 8;
                  GS1DATABAR14FINDERS[6][3] = 1;
                  GS1DATABAR14FINDERS[6][4] = 1;
                  
                  GS1DATABAR14FINDERS[7][0] = 1;
                  GS1DATABAR14FINDERS[7][1] = 5;
                  GS1DATABAR14FINDERS[7][2] = 7;
                  GS1DATABAR14FINDERS[7][3] = 1;
                  GS1DATABAR14FINDERS[7][4] = 1;
                  
                  GS1DATABAR14FINDERS[8][0] = 1;
                  GS1DATABAR14FINDERS[8][1] = 3;
                  GS1DATABAR14FINDERS[8][2] = 9;
                  GS1DATABAR14FINDERS[8][3] = 1;
                  GS1DATABAR14FINDERS[8][4] = 1;
                  
                  cd = "";
                  result = "";
                  filtereddata = filterInput_GS1Databar14(data);
                  var filteredlength = filtereddata.length;
              
                  if (filteredlength > 14) 
                          filtereddata = filtereddata.substr(0,14);
                  
                  if (filteredlength < 14) 
                  {
			    addcharlength = 14 - filteredlength;
                      for (x = 0;x<addcharlength;x++)
			    {
                          filtereddata = "0" + filtereddata;
                      }
                  }
                          
                  humanText = "(01)" + Right(filtereddata, 14);
		      _gs1d_human_text=humanText;

                  filtereddata = filtereddata.substr(0, 13);
                  
                  if (linkage == 1) 
                      filtereddata = "1" + filtereddata;
                  
                  filteredlength = filtereddata.length;
                  
                  valuez = 0;
                  for (x = 0;x<filteredlength;x++)
			{
                      tempChar = filtereddata.substr(x,1);
                      tempasc = tempChar.charCodeAt(0);
                      valuez = tempasc - 48 + (valuez * 10);
                  }
                  
                  sum = 0;
                  leftz = valuez / 4537077;
                  
                  left = Math.floor(leftz);
                  rightz = valuez - left * 4537077;
                  right = rightz;
                  
                  data1 = Math.floor(left / 1597);
                  data2 = left % 1597;
                  data3 = Math.floor(right / 1597);
                  data4 = right % 1597;
                  retval = getGS1W(data1, 1, 16, widthsodd);
                  retval = getGS1W(data1, 0, 16, widthseven);

                  for (x = 0;x<4;x++)
                  {    
                      
                      results1odd[x] = widthsodd[x];
                      results1even[x] = widthseven[x];
                      sum = sum + checksum[0][(x * 2)] * widthsodd[x] + checksum[0][(x * 2) + 1] * widthseven[x];
                  
                  }                  
                  retval = getGS1W(data2, 1, 15, widthsodd);
                  retval = getGS1W(data2, 0, 15, widthseven);

                  for (x = 0;x<4;x++)
                  {    
                      results2odd[x] = widthsodd[x];
                      results2even[x] = widthseven[x];
                      sum = sum + checksum[1][(x * 2)] * widthsodd[x] + checksum[1][(x * 2) + 1] * widthseven[x];
                      
                  }

                  retval = getGS1W(data3, 1, 16, widthsodd);
                  retval = getGS1W(data3, 0, 16, widthseven);


                  for (x = 0;x<4;x++)
			{    
                      results3odd[x] = widthsodd[x];
                      results3even[x] = widthseven[x];
                      sum = sum + checksum[2][(x * 2)] * widthsodd[x] + checksum[2][(x * 2) + 1] * widthseven[x];
                  }

                  retval = getGS1W(data4, 1, 15, widthsodd);
                  retval = getGS1W(data4, 0, 15, widthseven);


                  for (x = 0;x<4;x++)
			{
                      results4odd[x] = widthsodd[x];
                      results4even[x] = widthseven[x];
                      sum = sum + checksum[3][(x * 2)] * widthsodd[x] + checksum[3][(x * 2) + 1] * widthseven[x];
                  }

                  checksumval = sum % 79;
                  
                  ctemp = checksumval;
                  if (ctemp >= 8) 
			{
                      ctemp = ctemp + 1;
                  }
                      
                  if (ctemp >= 72) 
			{
                      ctemp = ctemp + 1;
                  }
              
                  cleft = Math.floor(ctemp / 9);
                  
                  cright = ctemp % 9;
                  
                  result = "11";
                  
                  for (x = 0;x<4;x++)
			{
                      result = result + String.fromCharCode(results1odd[x] + 48) + String.fromCharCode(results1even[x] + 48);
                  }
                  
                  for (x = 0;x<5;x++)
			{
                      result = result + String.fromCharCode(GS1DATABAR14FINDERS[cleft][x] + 48);
                  }
                  
                  for (x = 3;x>=0;x--) 
			{
                      result = result + String.fromCharCode(results2even[x] + 48) + String.fromCharCode(results2odd[x] + 48);
                  }
                  
                  for (x = 0;x<4;x++)
			{
                      result = result + String.fromCharCode(results4odd[x] + 48) + String.fromCharCode(results4even[x] + 48);
                  }
                      
                  for (x = 4;x>=0;x--) 
			{
                      result = result + String.fromCharCode(GS1DATABAR14FINDERS[cright][x] + 48);
                  }
                  
                  for (x = 3;x>=0;x--) 
			{
                      result = result + String.fromCharCode(results3even[x] + 48) + String.fromCharCode(results3odd[x] + 48);
                  }
                  result = result + "11";
                  bwresult = "";
                  black = 0;
                  for (x = 0;x<result.length;x++)
                  {
                      if (black == 0) 
                      {
                          bwresult = bwresult + String.fromCharCode(result.charCodeAt(x) + 48);
                          black = 1;
                      }
                      else
                      {
                          bwresult = bwresult + String.fromCharCode(result.charCodeAt(x) + 16);
                          black = 0;
                      }

                  }
  		      bwresult=html_decode(html_escape(bwresult));	                  
                  return bwresult;
              
              }
              
              function filterInput_GS1Databar14(data) 
              {
                  var datalength=0; 
              
                  var result = "";
                  datalength = data.length;
                  
                  var barcodechar = "";
                  for (x = 0;x<datalength;x++)
			{                
                      barcodechar = data.substr(x,1);
                      if (barcodechar.charCodeAt(0) <= 57 && barcodechar.charCodeAt(0) >= 48) 
                           result = result + barcodechar;
                  }
                
                  return result;
              
              }
              
              function combins__GS1Databar14(n,r) 
              {
                  var i=0, j=0; 
                  var maxDenom=0, minDenom=0; 
                  var val=0; 
                  
                      if (n - r > r) 
                      {
                          minDenom = r;
                          maxDenom = n - r;
                      }
                      else
			    {
                          minDenom = n - r;
                          maxDenom = r;
                      }
                      
                      
                      val = 1;
                      j = 1;
                      for (i = n;i>=maxDenom+1;i--)
			    {
                          val = val * i;
                          if (j <= minDenom) 
                          {
				      val = val / j;
                              j = j + 1;
                          }
                          
                      }
                      while (j <= minDenom)
                      {    
                          val = val / j;
                          j = j + 1;
                          
                      }
                          
                      return val;
              
              }
              
              function getGS1widths( val ,  n ,  elements ,  maxWidth ,  noNarrow ,  widths ) 
              {
var temv=val;
                  var bar=0; 
                  var elmWidth=0; 
                  var i =0;
                  var mxwElement=0; 
                  var subVal=0, lessVal=0; 
                  var narrowMask=0; 
                  var tempMask=0; 
                  
                  narrowMask = 0;

                  for (bar = 0;bar<elements-1;bar++)
                  {
                      elmWidth = 1;
                      tempMask = Math.pow(2,bar);
                      narrowMask = narrowMask | tempMask;
                          
                      while (1 > 0)
                      {
                                  subVal = combins__GS1Databar14(n - elmWidth - 1, elements - bar - 2);
                                  if ((noNarrow == 0) && (narrowMask == 0) && (n - elmWidth - (elements - bar - 1) >= elements - bar - 1))
					    { 
                                      subVal = subVal - combins__GS1Databar14(n - elmWidth - (elements - bar), elements - bar - 2);
                                  }
                                  if (elements - bar - 1 > 1) 
                                  {
                                      lessVal = 0;
                                      mxwElement = n - elmWidth - (elements - bar - 2);
                                      while (mxwElement > maxWidth)
                                      {                        
                                          lessVal = lessVal + combins__GS1Databar14(n - elmWidth - mxwElement - 1, elements - bar - 3);
                                          mxwElement = mxwElement - 1;
                                      
                                      }
                                      subVal = subVal - (lessVal * (elements - 1 - bar));
                                  }                        
                                  else if (n - elmWidth > maxWidth) 
                                  {
                                      subVal = subVal - 1;
                                      
                                  }

                                  val = val - subVal;


                                  if (val < 0) 
					    {
                                      break;
                                  }
                                  
                                  
                                  elmWidth = elmWidth + 1;
                                  tempMask = Math.pow(2,bar);
                                  narrowMask = narrowMask & (~ (tempMask));
                      }
                    
                      val = val + subVal;
                      n = n - elmWidth;
                      widths[bar] = elmWidth;
                      
                  }
                  widths[bar] = n;
                  return 0;
              
              }

              
              
              function getGS1W( data ,  oddeven ,  modules ,  widths ) 
              {
                  var retval=0; 
                  var WIDTH16_4_0=new Array(5);
			WIDTH16_4_0[0]=new Array(7);
			WIDTH16_4_0[1]=new Array(7);
			WIDTH16_4_0[2]=new Array(7);
			WIDTH16_4_0[3]=new Array(7);
			WIDTH16_4_0[4]=new Array(7);

                  var WIDTH16_4_1=new Array(5);
			WIDTH16_4_1[0]=new Array(7);
			WIDTH16_4_1[1]=new Array(7);
			WIDTH16_4_1[2]=new Array(7);
			WIDTH16_4_1[3]=new Array(7);
			WIDTH16_4_1[4]=new Array(7);

                  var WIDTH15_4_0=new Array(4);
			WIDTH15_4_0[0]=new Array(7);
			WIDTH15_4_0[1]=new Array(7);
			WIDTH15_4_0[2]=new Array(7);
			WIDTH15_4_0[3]=new Array(7);

                  var WIDTH15_4_1=new Array(4);
			WIDTH15_4_1[0]=new Array(7);
			WIDTH15_4_1[1]=new Array(7);
			WIDTH15_4_1[2]=new Array(7);
			WIDTH15_4_1[3]=new Array(7);
                      
                  WIDTH16_4_0[0][0] = 0;
                  WIDTH16_4_0[0][1] = 160;
                  WIDTH16_4_0[0][2] = 1;
                  WIDTH16_4_0[0][3] = 4;
                  WIDTH16_4_0[0][4] = 4;
                  WIDTH16_4_0[0][5] = 1;
                  WIDTH16_4_0[0][6] = 0;
              
                  WIDTH16_4_0[1][0] = 161;
                  WIDTH16_4_0[1][1] = 960;
                  WIDTH16_4_0[1][2] = 10;
                  WIDTH16_4_0[1][3] = 6;
                  WIDTH16_4_0[1][4] = 4;
                  WIDTH16_4_0[1][5] = 3;
                  WIDTH16_4_0[1][6] = 0;
                  
                  WIDTH16_4_0[2][0] = 961;
                  WIDTH16_4_0[2][1] = 2014;
                  WIDTH16_4_0[2][2] = 34;
                  WIDTH16_4_0[2][3] = 8;
                  WIDTH16_4_0[2][4] = 4;
                  WIDTH16_4_0[2][5] = 5;
                  WIDTH16_4_0[2][6] = 0;
                  
                  WIDTH16_4_0[3][0] = 2015;
                  WIDTH16_4_0[3][1] = 2714;
                  WIDTH16_4_0[3][2] = 70;
                  WIDTH16_4_0[3][3] = 10;
                  WIDTH16_4_0[3][4] = 4;
                  WIDTH16_4_0[3][5] = 6;
                  WIDTH16_4_0[3][6] = 0;
              
                  WIDTH16_4_0[4][0] = 2715;
                  WIDTH16_4_0[4][1] = 2840;
                  WIDTH16_4_0[4][2] = 126;
                  WIDTH16_4_0[4][3] = 12;
                  WIDTH16_4_0[4][4] = 4;
                  WIDTH16_4_0[4][5] = 8;
                  WIDTH16_4_0[4][6] = 0;
              
                  WIDTH16_4_1[0][0] = 0;
                  WIDTH16_4_1[0][1] = 160;
                  WIDTH16_4_1[0][2] = 1;
                  WIDTH16_4_1[0][3] = 12;
                  WIDTH16_4_1[0][4] = 4;
                  WIDTH16_4_1[0][5] = 8;
                  WIDTH16_4_1[0][6] = 1;
              
                  WIDTH16_4_1[1][0] = 161;
                  WIDTH16_4_1[1][1] = 960;
                  WIDTH16_4_1[1][2] = 10;
                  WIDTH16_4_1[1][3] = 10;
                  WIDTH16_4_1[1][4] = 4;
                  WIDTH16_4_1[1][5] = 6;
                  WIDTH16_4_1[1][6] = 1;
              
                  WIDTH16_4_1[2][0] = 961;
                  WIDTH16_4_1[2][1] = 2014;
                  WIDTH16_4_1[2][2] = 34;
                  WIDTH16_4_1[2][3] = 8;
                  WIDTH16_4_1[2][4] = 4;
                  WIDTH16_4_1[2][5] = 4;
                  WIDTH16_4_1[2][6] = 1;
              
                  WIDTH16_4_1[3][0] = 2015;
                  WIDTH16_4_1[3][1] = 2714;
                  WIDTH16_4_1[3][2] = 70;
                  WIDTH16_4_1[3][3] = 6;
                  WIDTH16_4_1[3][4] = 4;
                  WIDTH16_4_1[3][5] = 3;
                  WIDTH16_4_1[3][6] = 1;
              
                  WIDTH16_4_1[4][0] = 2715;
                  WIDTH16_4_1[4][1] = 2840;
                  WIDTH16_4_1[4][2] = 126;
                  WIDTH16_4_1[4][3] = 4;
                  WIDTH16_4_1[4][4] = 4;
                  WIDTH16_4_1[4][5] = 1;
                  WIDTH16_4_1[4][6] = 1;
            
		      WIDTH15_4_0[0][0] = 0;
                  WIDTH15_4_0[0][1] = 335;
                  WIDTH15_4_0[0][2] = 4;
                  WIDTH15_4_0[0][3] = 10;
                  WIDTH15_4_0[0][4] = 4;
                  WIDTH15_4_0[0][5] = 7;
                  WIDTH15_4_0[0][6] = 1;
                  
                  WIDTH15_4_0[1][0] = 336;
                  WIDTH15_4_0[1][1] = 1035;
                  WIDTH15_4_0[1][2] = 20;
                  WIDTH15_4_0[1][3] = 8;
                  WIDTH15_4_0[1][4] = 4;
                  WIDTH15_4_0[1][5] = 5;
                  WIDTH15_4_0[1][6] = 1;
                  
                  WIDTH15_4_0[2][0] = 1036;
                  WIDTH15_4_0[2][1] = 1515;
                  WIDTH15_4_0[2][2] = 48;
                  WIDTH15_4_0[2][3] = 6;
                  WIDTH15_4_0[2][4] = 4;
                  WIDTH15_4_0[2][5] = 3;
                  WIDTH15_4_0[2][6] = 1;
                      
                  WIDTH15_4_0[3][0] = 1516;
                  WIDTH15_4_0[3][1] = 1596;
                  WIDTH15_4_0[3][2] = 81;
                  WIDTH15_4_0[3][3] = 4;
                  WIDTH15_4_0[3][4] = 4;
                  WIDTH15_4_0[3][5] = 1;
                  WIDTH15_4_0[3][6] = 1;
              
		      WIDTH15_4_1[0][0] = 0;
                  WIDTH15_4_1[0][1] = 335;
                  WIDTH15_4_1[0][2] = 4;
                  WIDTH15_4_1[0][3] = 5;
                  WIDTH15_4_1[0][4] = 4;
                  WIDTH15_4_1[0][5] = 2;
                  WIDTH15_4_1[0][6] = 0;
                   
                  WIDTH15_4_1[1][0] = 336;
                  WIDTH15_4_1[1][1] = 1035;
                  WIDTH15_4_1[1][2] = 20;
                  WIDTH15_4_1[1][3] = 7;
                  WIDTH15_4_1[1][4] = 4;
                  WIDTH15_4_1[1][5] = 4;
                  WIDTH15_4_1[1][6] = 0;
                  
                  WIDTH15_4_1[2][0] = 1036;
                  WIDTH15_4_1[2][1] = 1515;
                  WIDTH15_4_1[2][2] = 48;
                  WIDTH15_4_1[2][3] = 9;
                  WIDTH15_4_1[2][4] = 4;
                  WIDTH15_4_1[2][5] = 6;
                  WIDTH15_4_1[2][6] = 0;
                  
                  WIDTH15_4_1[3][0] = 1516;
                  WIDTH15_4_1[3][1] = 1596;
                  WIDTH15_4_1[3][2] = 81;
                  WIDTH15_4_1[3][3] = 11;
                  WIDTH15_4_1[3][4] = 4;
                  WIDTH15_4_1[3][5] = 8;
                  WIDTH15_4_1[3][6] = 0;
                                      
                  if (modules == 16) 
                  {
                       if (oddeven == 0) 
			     {                      
                          for (x = 0;x<5;x++)
				  {
                              if (data >= WIDTH16_4_0[x][0] && data <= WIDTH16_4_0[x][1])
                              {

                                  retval = getGS1widths(Math.floor((data - WIDTH16_4_0[x][0]) % WIDTH16_4_0[x][2]), WIDTH16_4_0[x][3], WIDTH16_4_0[x][4], WIDTH16_4_0[x][5], WIDTH16_4_0[x][6], widths);

                              
                              }
                          }
                      }
                      else
                      {       

                          for (x = 0;x<5;x++)
                          {    
                              if (data >= WIDTH16_4_1[x][0] && data <= WIDTH16_4_1[x][1]) 
                              {    

                                  retval = getGS1widths(Math.floor((data - WIDTH16_4_1[x][0]) / WIDTH16_4_1[x][2]), WIDTH16_4_1[x][3], WIDTH16_4_1[x][4], WIDTH16_4_1[x][5], WIDTH16_4_1[x][6], widths);
                              }
                              
                           }
                           
                      }
                  }
                  else if (modules == 15) 
                  {
                      if (oddeven == 0) 
                      {
                          
                          for (x = 0;x<4;x++)
				  {
                              if (data >= WIDTH15_4_0[x][0] && data <= WIDTH15_4_0[x][1]) 
                              {
                                  retval = getGS1widths(Math.floor((data - WIDTH15_4_0[x][0]) / WIDTH15_4_0[x][2]), WIDTH15_4_0[x][3], WIDTH15_4_0[x][4], WIDTH15_4_0[x][5], WIDTH15_4_0[x][6], widths);
                              }
                          }
                          
                      }
                      else
                      {
                          
                          for (x = 0;x<4;x++)
				  {
                              if (data >= WIDTH15_4_1[x][0] && data <= WIDTH15_4_1[x][1])
					{ 
                                  retval = getGS1widths(Math.floor((data - WIDTH15_4_1[x][0]) % WIDTH15_4_1[x][2]), WIDTH15_4_1[x][3], WIDTH15_4_1[x][4], WIDTH15_4_1[x][5], WIDTH15_4_1[x][6], widths);
                              }
                          }
                      
                      }
                      
                  }
                  
                  return 0;
              
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

