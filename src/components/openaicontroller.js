import openai from '../openaiconfig'; 

const generateMeta = async (title, price,item) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: `Come up with a hint that will lead the users to the price give the prompt: "${title}" , the price of the item: "${price}". and the description of the item: ${item} make sure to not actually include the price` }],
            model: "gpt-4o-mini",
            max_tokens: 100,
        });

       
        console.log("API Response:", completion);

      
        if (completion.choices && completion.choices.length > 0) {
            const meta = completion.choices[0].message.content;
            return meta;
        } else {
            console.error("No choices returned in the response");
            return null; 
        }
    } catch (error) {
        console.error("Error in generateMeta:", error);
        return null; 
    }
};

export default generateMeta;
