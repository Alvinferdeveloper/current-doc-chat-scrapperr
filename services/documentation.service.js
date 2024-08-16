import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const saveDocumentation = async (content)=>{
    const { data, error } = await supabase
    .from('pdf')
    .insert([
      { text: content, name:"next" },
    ])
    .select()
  
    if(error) console.log(error);
  }