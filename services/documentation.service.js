import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
config();
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const saveDocumentation = async (topics)=>{
    for(let topicDoc of topics){
    const { topic, documentation} = topicDoc;
    const { data, error } = await supabase
    .from('topic')
    .insert([
      { name: topic, documentation },
    ])
    .select()
  
    if(error) console.log(error);
    }
  }