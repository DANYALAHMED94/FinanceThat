import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DealerPending({ }) {
  

  return (
    <div >
    <main className="MainBody">
    
     <div className="Pending-ListHead">
      <h1>Pending Accounts</h1>
     </div>
     
     <div className="Admin-ActiveList-Container">
      
      <ul className="nav nav-tabs TableTab" id="myTab" role="tablist">
      
  		<li className="nav-item">
         <a className="active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Dealers</a>
        </li>
 		
  		<li className="nav-item">
         <a className="" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Private</a>
        </li>
 		  
	  </ul>
	  
	  <div className="tab-content" id="myTabContent">
	   
	   <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
	   	
	   	<div className="AlContainer">
	   	 
	   	 <div className="ActiveList-Left">
	   	  <input type="text" id="" name="" placeholder="Search for pending accounts" />
	   	 </div>
	   	 
	   	 <div className="ActiveList-Right"><button type="submit">Archive</button></div>
	   	 
	   	</div>
	   	
	   	<div className="Altable-Container">
	   	 <div className="Admin-dtable">
         
          <table styles="width:100%">
       
           <thead>
            <tr>
         
             <th>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </th>
          
             <th><span>ID</span></th>
             <th>Business Name</th>
             <th>City</th>
             <th>Telephone</th>
             <th>Email Address</th>
             <th>Date added</th>
            </tr>
           </thead>
        
           <tbody>
           
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>

           </tbody>
        
          </table>
       
	   	 </div>
	    </div>
	    
	   </div>
		  
	   <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
	   	
	   	<div className="AlContainer">
	   	 
	   	 <div className="ActiveList-Left">
	   	  <input type="text" id="" name="" placeholder="Search for pending accounts" />
	   	 </div>
	   	 
	   	 <div className="ActiveList-Right"><button type="submit">Archive</button></div>
	   	 
	   	</div>
	   	
	   	<div className="Altable-Container">
	   	 <div className="Admin-dtable">
         
          <table styles="width:100%">
       
           <thead>
            <tr>
         
             <th>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </th>
          
             <th><span>ID</span></th>
             <th>Business Name</th>
             <th>City</th>
             <th>Telephone</th>
             <th>Email Address</th>
             <th>Date added</th>
            </tr>
           </thead>
        
           <tbody>
           
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>
            
            <tr>
            
             <td>
              <label className="ListCheckBox">
  			   <input type="checkbox" />
  			   <div className="ListMark"></div>
		      </label>
             </td>
             
             <td><span>48</span></td>
             <td><span>27 Motorsports</span></td>
             <td>Toronto</td>
             <td>416-445-3343</td>
             <td>info@27motorsports.ca</td>
             <td>Dec 14, 2018</td>
             <td><a href="#">Review</a></td>
             
            </tr>

           </tbody>
        
          </table>
       
	   	 </div>
	    </div>
	   	
	   </div>

	  </div>
      
     </div>
     
    </main>
    </div>
  );
}
