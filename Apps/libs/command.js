/*
 * author  : umar <Jukoo>  <github.com/jukoo> 
 */  


const  {  
    readdirSync,  
    readFileSync , 
    constants
} = require("fs") , 
    { log } = console,  
    { list_allocated_job_space } = require("./utils")  


mtdtart = `
---
 ███╗   ███╗████████╗██████╗ ████████╗
 ████╗ ████║╚══██╔══╝██╔══██╗╚══██╔══╝
 ██╔████╔██║   ██║   ██║  ██║   ██║   
 ██║╚██╔╝██║   ██║   ██║  ██║   ██║   
 ██║ ╚═╝ ██║   ██║   ██████╔╝   ██║   
 ╚═╝     ╚═╝   ╚═╝   ╚═════╝    ╚═╝ 
\t\t\t\t* version  beta 4.5.2 
`

module.exports =   {  

    ["clear"]  : (...unused_argument)   =>    {
        return  { 
            data   : " ", 
            description: "clear the terminal\n"
        } 
    },  
    ["help"]   :  (...cmd_name) =>   {
        let  cmd_helper_collects  = [ mtdtart ]
        try  {  
            
            if  (!cmd_name[0].length)  
            { 
                log ( "no  cmd") 
                for (let key of  Object.keys(module.exports)  )  {
                    
                    if   ( key != "help")
                    {
                         cmd_helper_collects.push(`\r${key}\t:\t${module.exports[key]().description}`)
                    }
                   
                }
                
                return    { data :  cmd_helper_collects }    
            }
         
            return  {  data : module.exports[cmd_name[0]]().description }  
        }catch  (e)  { }  
    },  
    
    ["ls"]  :   ( ...local_vworks  ) => {
        const  virtual_workspace =  local_vworks[0]  ||  (void function ()  { return } ()) 
        let files_list =  "No such  file(s) in your workspace\n"  

        if   (virtual_workspace)  
        {
            let  files = readdirSync ( virtual_workspace ,  {withFileTypes : true } )
            if  (files.length) files_list= files.map ( file => `${file.name} \n`)  
        } 
        return   { 
            data :  files_list,
            description  :  "list   all  files  on your  virtual workspace \n"
        }
       
    } ,
    ["cat"]  :( ...filetarget) => {  
      
        filetarget =  filetarget[0]  ||  (void function () { return } () )   
        if  ( filetarget   && filetarget.length   > 1 )  
        {
            const  path  = filetarget.join("/")  
            const [ ,filename ]  =  [ ...filetarget] 
            try  { 
                file_content =  readFileSync(path, "utf-8")  
                filetarget =  file_content +"\n" 
            }catch  ( Err )  {
                log(Err) 
                filetarget  = `${filename}  not found\n` 
            }
        } 
        else   filetarget = null  
        return  { 
            data  :   filetarget || ( void function ()  { return  } () ) , 
            description : "show  file contents\n"
        }
    },
    ["about"] :  (...unused_argument ) =>  {  
     
        return  { 
            data  :  ( void function () { return } () )  , 
            description : "tell about m-TDT\n"
        }
    },

    ["credits"] :  (  ...unused_argument ) => {  
        return  {
            data :  ( void function () { return } () ) , 
            description : "print  all support  behing  m-TDT\n"
        }
    },
        
    ["tree"]  :  ( ...local_vworks ) =>  {  

        return  { 
            data  :  ( void function ()  { return } () )  , 
            description  :  "make a simple graph tree  view of files \n"
        }
    },

    ["file"] :  ( ...filetarget) => {

        return  { 
            data  :  ( void function () { return } ()) , 
            description : "show metadata files \n"
        }
    }
}  
