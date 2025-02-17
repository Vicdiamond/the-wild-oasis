import supabase, { supabaseUrl } from './supabase'
// import {supa}

export async function getCabins () {
  let { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.log(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export async function deleteCabin (id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.log(error)
    throw new Error('Cabins could not be deleted')
  }
}

export async function createEditCabin (newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  )

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // Create/Edit cabin
  let query = supabase.from('cabins')

  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

  // B) Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select()

  const { data, error } = await query.select().single()

  // Upload file
  if (hasImagePath) return data

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    console.log(storageError)
    throw new Error(
      'Cabin image could not be uploaded, and the cabin was not created'
    )
  }

  if (error) {
    throw new Error('Cabin could not be created')
  }

  return data
}
