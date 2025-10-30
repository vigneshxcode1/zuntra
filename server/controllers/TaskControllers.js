
import Task from "../model/Taskmodel.js"





export const CreateTask = async(req,res)=>{
try {
    const task = await Task.create
    ({
         title: req.body.title
     });
    res.json(task);
  } catch (err) { res.status(500).json(
    {
     message: err.message,
     
    }); }
}

export const GetTask=async(req,res)=>{
     try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
      } catch (err) { res.status(500).json(
        { 
        message: err.message });
     }
}

export const UpdateTask=async(req,res)=>{
try {
   const { id } = req.params;
    const task = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
}


export const DeleteTask = async(req,res)=>{
     try {
    const task = await Task.findOneAndDelete({ _id: req.params.id});
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted success' });
  } catch (err) { res.status(500).json({ message: err.message }); }
}