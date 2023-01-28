import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function CreditReport({ }) {
  

  return (
    <div >
    <main className="MainBody">
    
	 <div className="CreditReport-Container">
	 
	  <div className="Admin-CreditReport">
	   
	   <div className="CreditLeft">
	   	<h1>Joseph Maurer - Credit Report</h1>
	   </div>
	   
	   <div className="CreditRight">
   	    <button><img src="image/sprite-icon/icon-print.svg" alt=""/></button>
   	    <h2>CREDIT SCORE: <span>578</span></h2>
   	   </div>
	   
	  </div>
	  	  
	 </div>
     
     <div className="Admin-PersonalInfo-Container">
	  	
	   <div className="Admin-InfoInner">
	    <h1>Personal Information</h1>
	    
	    <ul>
	    	
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Name</h2>
	       	<h3>Joseph Maurer</h3>
	       </div>
	      </li>	
	    	
	    </ul>
	    
	   </div>
	   
	   <div className="Admin-InfoInner2">
	    <h1>Address</h1>
	    
	    <ul>
	    	
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Current Employment</h2>
	       	<h3>Joseph</h3>
	       </div>
	      </li>
	      
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Occupation</h2>
	       	<h3>N/A</h3>
	       </div>
	      </li>	
	    	
	    </ul>
	    
	   </div>
   			
   	   <div className="Admin-InfoInner">
	    <h1>Employment</h1>
	    
	    <ul>
	    	
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Employer</h2>
	       	<h3>Joseph</h3>
	       </div>
	      </li>
	      
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Occupation</h2>
	       	<h3>Manager</h3>
	       </div>
	      </li>
	      
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Date of Last Activity</h2>
	       	<h3>2020-03-05</h3>
	       </div>
	      </li>
	      
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Date of Birth</h2>
	       	<h3>2020-03-05</h3>
	       </div>
	      </li>	
	    	
	    </ul>
	    
	   </div>
   			
   	   <div className="Admin-InfoInner mb-0">
	    <h1>Credit File</h1>
	    
	    <ul>
	    	
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Employer</h2>
	       	<h3>Joseph</h3>
	       </div>
	      </li>
	      
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Occupation</h2>
	       	<h3>Manager</h3>
	       </div>
	      </li>
	      
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Date of Last Activity</h2>
	       	<h3>2020-03-05</h3>
	       </div>
	      </li>
	      
	      <li>
	       <div className="Admin-PrName">
	       	<h2>Date of Birth</h2>
	       	<h3>2020-03-05</h3>
	       </div>
	      </li>	
	    	
	    </ul>
	    
	   </div>
	  	
	  </div>
	  
	 <div className="TradeAcc-Container">
	 	
	  <div className="TradeAcc-Head">
	   <h1>Trades/Accounts</h1>
	  </div>
	  
	  <div className="Revolving-Head">
	   <h1>REVOLVING</h1>
	   <h2>CHASE SEARS</h2>
	   <h3>Account: <span>121212</span></h3>
	  </div>
	  
	  <div className="Admin-OverViewList">
	   <h1>OVERVIEW</h1>
	   
	   <ul>
	   	<li><h3>Balance</h3></li>
	   	<li><h4>100</h4></li>
	   	<li><h3>Credit Limit</h3></li>
	   	<li><h4>100</h4></li>
	   	<li><h3>Payment Amount</h3></li>
	   	<li><h4>N/A</h4></li>
	   	<li><h3>Past Due Amount</h3></li>
	   	<li><h4>N/A</h4></li>
	   </ul>
	   
	  </div>
	  
	  <div className="Admin-OverViewList">
	   <h1>ACCOUNT DETAILS</h1>
	   
	   <ul>
	   	<li><h3>Status</h3></li>
	   	<li><h4>Two payments past due</h4></li>
	   	<li><h3>Type</h3></li>
	   	<li><h4>Revolving</h4></li>
	   	<li><h3>Association</h3></li>
	   	<li><h4>Individual</h4></li>
	   	<li><h3>Last Activity</h3></li>
	   	<li><h4>2019-12</h4></li>
	   	<li><h3>Date Opened</h3></li>
	   	<li><h4>2017-10</h4></li>
	   	<li><h3>Date Reported</h3></li>
	   	<li><h4>2020-01</h4></li>
	   	<li><h3>Months Reviewed</h3></li>
	   	<li><h4>08</h4></li>
	   	<li><h3>Description</h3></li>
	   	<li><h4>EX MONTHLY</h4></li>
	   </ul>
	   
	  </div>
	  
	  <div className="Admin-PaymetList">
	   <h1>PAYMENT HISTORY</h1>
	   
	   <ul>
	   	<li><h2>Two payments past due</h2></li>
	   	<li><h3>2019-09</h3></li>
	   	<div className="clearfix"></div>
	   	<li><h2>Two payments past due</h2></li>
	   	<li><h3>2018-08</h3></li>
	   	<div className="clearfix"></div>
	   	<li><h2>At least 120 days past due</h2></li>
	   	<li><h3>2018-03</h3></li>
	   </ul>
	   
	  </div>
	  
	  
	  <div className="Revolving-Head">
	   <h5></h5>
	   <h2>TYCO CAPITAL CANADA</h2>
	   <h3>Account: <span>121212</span></h3>
	  </div>
	  
	  <div className="Admin-OverViewList">
	   <h1>OVERVIEW</h1>
	   
	   <ul>
	   	<li><h3>Balance</h3></li>
	   	<li><h4>0</h4></li>
	   	<li><h3>Credit Limit</h3></li>
	   	<li><h4>3000</h4></li>
	   	<li><h3>Payment Amount</h3></li>
	   	<li><h4>N/A</h4></li>
	   	<li><h3>Past Due Amount</h3></li>
	   	<li><h4>N/A</h4></li>
	   </ul>
	   
	  </div>
	  
	  <div className="Admin-OverViewList">
	   <h1>ACCOUNT DETAILS</h1>
	   
	   <ul>
	   	<li><h3>Status</h3></li>
	   	<li><h4>At least 120 days past due</h4></li>
	   	<li><h3>Type</h3></li>
	   	<li><h4>Revolving</h4></li>
	   	<li><h3>Association</h3></li>
	   	<li><h4>N/A</h4></li>
	   	<li><h3>Last Activity</h3></li>
	   	<li><h4>2019-12</h4></li>
	   	<li><h3>Date Opened</h3></li>
	   	<li><h4>1997-12</h4></li>
	   	<li><h3>Date Reported</h3></li>
	   	<li><h4>2020-01</h4></li>
	   	<li><h3>Months Reviewed</h3></li>
	   	<li><h4>08</h4></li>
	   	<li><h3>Description</h3></li>
	   	<li><h4>HM ACCOUNT CLOSED</h4></li>
	   </ul>
	   
	  </div>
	  
	  <div className="Admin-PaymetList pb-0">
	   <h1>PAYMENT HISTORY</h1>
	   
	   <ul>
	   	<li className="mb-0"><h2>At least 120 days past due</h2></li>
	   	<li className="mb-0"><h3>2019-09</h3></li>
	   </ul>
	   
	  </div>
	 	
	 </div>
	 
	 <div className="TradeAcc-Container Admin-PaymentMt">
	  
	  <div className="Revolving-Head mt-0">
	   <h1>INSTALLMENT</h1>
	   <h2>SCOTIA BANK</h2>
	   <h3>Account: <span>2105906565406</span></h3>
	  </div>
	  
	  <div className="Admin-OverViewList">
	   <h1>OVERVIEW</h1>
	   
	   <ul>
	   	<li><h3>Balance</h3></li>
	   	<li><h4>100</h4></li>
	   	<li><h3>Credit Limit</h3></li>
	   	<li><h4>100</h4></li>
	   	<li><h3>Payment Amount</h3></li>
	   	<li><h4>N/A</h4></li>
	   	<li><h3>Past Due Amount</h3></li>
	   	<li><h4>N/A</h4></li>
	   </ul>
	   
	  </div>
	  
	  <div className="Admin-OverViewList">
	   <h1>ACCOUNT DETAILS</h1>
	   
	   <ul>
	   	<li><h3>Status</h3></li>
	   	<li><h4>Two payments past due</h4></li>
	   	<li><h3>Type</h3></li>
	   	<li><h4>Revolving</h4></li>
	   	<li><h3>Association</h3></li>
	   	<li><h4>Individual</h4></li>
	   	<li><h3>Last Activity</h3></li>
	   	<li><h4>2019-12</h4></li>
	   	<li><h3>Date Opened</h3></li>
	   	<li><h4>2017-10</h4></li>
	   	<li><h3>Date Reported</h3></li>
	   	<li><h4>2020-01</h4></li>
	   	<li><h3>Months Reviewed</h3></li>
	   	<li><h4>08</h4></li>
	   	<li><h3>Description</h3></li>
	   	<li><h4>EX MONTHLY</h4></li>
	   </ul>
	   
	  </div>
	  
	  <div className="Admin-PaymetList">
	   <h1>PAYMENT HISTORY</h1>
	   
	   <ul>
	   	<li><h2>N/A</h2></li>
	   </ul>
	   
	  </div>
	  
	  <div className="Revolving-Head mt-0">
	   <h1>OPEN</h1>
	   <h4>No open account reported</h4>
	  </div>
	  
	  <div className="Revolving-Head mt-0">
	   <h1>MORTGAGE</h1>
	   <h4>No open account reported</h4>
	  </div>
	 	
	 </div>
	 
	 <div className="TradeAcc-Container">
	 	
	  <div className="TradeAcc-Head">
	   <h1>Credit Inquiries</h1>
	  </div>
	  
	  <div className="Admin-CreditList">
	   <h1>INQUIRIES</h1>
	   
	   <ul>
	    
	     <li>
	      <div className="Inquirt-CreditHead">
	       <h2>EQUIFAX ADS</h2>
	       <h3>Reported: 2019-08-27</h3>
	      </div>
	     </li>
	     
	     <li>
	      <div className="Inquirt-CreditHead">
	       <h2>HSBC RETAIL SERVICES</h2>
	       <h3>Reported: 2019-08-27</h3>
	      </div>
	     </li>
	     
	     <li>
	      <div className="Inquirt-CreditHead">
	       <h2>HSBC RETAIL SERVICES</h2>
	       <h3>Reported: 2019-08-27</h3>
	      </div>
	     </li>
	     
	     <li>
	      <div className="Inquirt-CreditHead">
	       <h2>NORTHWEST COMPANY</h2>
	       <h3>Reported: 2019-08-27</h3>
	      </div>
	     </li>	
	   
	   </ul>
	   
	  </div>
	  

	 </div>
	 
	 <div className="TradeAcc-Container">
	 	
	  <div className="TradeAcc-Head">
	   <h1>Bankruptcies</h1>
	  </div>
	  
	  <div className="Admin-BankrupList">
	   <h1>BANKRUPTCIES</h1>
	   
	   <ul>
	   
	   	<li><h2>Date Filed</h2></li>
	   	<li><h3>2014-03</h3></li>
	   	
	   	<li><h2>Court Name</h2></li>
	   	<li><h3>Cs qebe</h3></li>
	   	
	   	<li><h2>Court Number</h2></li>
	   	<li><h3>015VS00075</h3></li>
	   	
	   	<li><h2>Agency</h2></li>
	   	<li><h3>Cashmax</h3></li>
	   	
	   	<li><h2>Creditor</h2></li>
	   	<li><h3>Abc retail inc</h3></li>
	   	
	   	<li><h2>Date Reported</h2></li>
	   	<li><h3>2020-01</h3></li>
	   	
	   	<li><h2>Months Reviewed</h2></li>
	   	<li><h3>08</h3></li>
	   	
	   	<li><h2>Description</h2></li>
	   	<li><h3>EX MONTHLY</h3></li>
	   	
	   </ul>
	   
	  </div>
	  
	  

	 </div>
	 
	 <div className="TradeAcc-Container">
	 	
	  <div className="TradeAcc-Head">
	   <h1>Collections</h1>
	  </div>
	  
	  <div className="Admin-BankrupList">
	   <h1>Collections</h1>
	   
	   <ul className="Admin-BankBorder">
	   
	   	<li><h2>Reported</h2></li>
	   	<li><h3>2001-12</h3></li>
	   	
	   	<li><h2>Amount</h2></li>
	   	<li><h3>2500</h3></li>
	   	
	   	<li><h2>Balance</h2></li>
	   	<li><h3>2212</h3></li>
	   	
	   	<li><h2>Agency</h2></li>
	   	<li><h3>Cashmax</h3></li>
	   	
	   	<li><h2>Creditor</h2></li>
	   	<li><h3>Abc retail inc</h3></li>
	   	
	   	<li><h2>Status</h2></li>
	   	<li><h3>Unpaid</h3></li>
	   	
	   	<li><h2>DLA</h2></li>
	   	<li><h3>2001-12</h3></li>
	   	
	   	<li><h2>Verification Date</h2></li>
	   	<li><h3>2001-12</h3></li>
	   	
	   	<li><h2>Ledger Number</h2></li>
	   	<li><h3>1111111</h3></li>
	   	
	   </ul>
	   
	  </div>
	  
	  

	 </div>
	 
	 <div className="TradeAcc-Container">
	 	
	  <div className="TradeAcc-Head">
	   <h1>Legal Items</h1>
	  </div>
	  
	  <div className="Admin-BankrupList">
	   <h1>JUDGMENT OR FORCLOSURE</h1>
	   
	   <ul className="Admin-BankBorder">
	   
	   	<li><h2>Type</h2></li>
	   	<li><h3>Judgment</h3></li>
	   	
	   	<li><h2>Date Filed</h2></li>
	   	<li><h3>2016-12</h3></li>
	   	
	   	<li><h2>Court Name</h2></li>
	   	<li><h3>Metcredit</h3></li>
	   	
	   	<li><h2>Court Number</h2></li>
	   	<li><h3>650YC00066</h3></li>
	   	
	   	<li><h2>Case Number</h2></li>
	   	<li><h3>321452154521</h3></li>
	   	
	   	<li><h2>Status</h2></li>
	   	<li><h3>Satisfied</h3></li>
	   	
	   	<li><h2>Status Date</h2></li>
	   	<li><h3>2017-06</h3></li>
	   	
	   	<li><h2>Amount</h2></li>
	   	<li><h3>5000</h3></li>
	   	
	   	<li><h2>Defendant</h2></li>
	   	<li><h3>Nickey house</h3></li>
	   	
	   	<li><h2>Plaintiff</h2></li>
	   	<li><h3>Ronald ruck</h3></li>
	   	
	   </ul>
	   
	  </div>
	  
	  

	 </div>
	 
	 <div className="TradeAcc-Container">
	 	
	  <div className="TradeAcc-Head">
	   <h1>Secured Loans</h1>
	  </div>
	  
	  <div className="Admin-BankrupList">
	   <h1>CHATTEL MORGAGE, REGISTERED LOAN OR REGISTERED LEAN </h1>
	   
	   <ul className="Admin-BankBorder">
	   
	   	<li><h2>Date Filed</h2></li>
	   	<li><h3>2001-12</h3></li>
	   	
	   	<li><h2>Court Name</h2></li>
	   	<li><h3>Ministry govt serv</h3></li>
	   	
	   	<li><h2>Court Number</h2></li>
	   	<li><h3>650VS00055</h3></li>
	   	
	   	<li><h2>Creditor-Amount</h2></li>
	   	<li><h3>A1auto inc 30292</h3></li>
	   	
	   	<li><h2>Description</h2></li>
	   	<li><h3>Security disposition unknown</h3></li>
	   	
	   	<li><h2>Maturity Date</h2></li>
	   	<li><h3>2001-12</h3></li>
	   	
	   </ul>
	   
	  </div>
	  
	  

	 </div>
	 
	 <div className="TradeAcc-Container">
	 	
	  <div className="TradeAcc-Head">
	   <h1>NSFs</h1>
	  </div>
	  
	  <div className="Admin-BankrupList">
	   <h1>NSF</h1>
	   
	   <ul className="Admin-BankBorder">
	   
	   	<li><h2>Date Reported</h2></li>
	   	<li><h3>2019-04</h3></li>
	   	
	   	<li><h2>Creditor</h2></li>
	   	<li><h3>Bmo 0724</h3></li>
	   	
	   	<li><h2>Amount</h2></li>
	   	<li><h3>500 489658452</h3></li>
	   	
	   	<li><h2>Details</h2></li>
	   	<li><h3>Insufficent funds</h3></li>
	   	
	   </ul>
	   
	  </div>
	  
	  

	 </div>
	 
	 <div className="TradeAcc-Container Admin-LastBt">
	 	
	  <div className="TradeAcc-Head">
	   <h1>Garnishments</h1>
	  </div>
	  
	  <div className="Admin-BankrupList">
	   <h1>GARNISHMENT</h1>
	   
	   <ul className="Admin-BankBorder">
	   
	   	<li><h2>Date Filed</h2></li>
	   	<li><h3>2015-08</h3></li>
	   	
	   	<li><h2>Court Name</h2></li>
	   	<li><h3>Metcredit</h3></li>
	   	
	   	<li><h2>Court Number</h2></li>
	   	<li><h3>650YC00066</h3></li>
	   	
	   	<li><h2>Case Number</h2></li>
	   	<li><h3>321452154521</h3></li>
	   	
	   	<li><h2>Amount</h2></li>
	   	<li><h3>5000</h3></li>
	   	
	   	<li><h2>Plaintiff</h2></li>
	   	<li><h3>Cibc</h3></li>
	   	
	   	<li><h2>Garnishee</h2></li>
	   	<li><h3>Ronald ruck</h3></li>
	   	
	   	<li><h2>Defendant</h2></li>
	   	<li><h3>Rickey rouse</h3></li>
	   	
	   </ul>
	   
	  </div>
	  
	  

	 </div>
   
    </main>
    </div>
  );
}
