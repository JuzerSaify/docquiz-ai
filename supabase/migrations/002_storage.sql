-- Run this AFTER the initial migration in Supabase SQL Editor

-- Create the documents storage bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documents', 'documents', false, 10485760, array['application/pdf']);

-- Storage policy: users can upload to their own folder
create policy "Users can upload to own folder"
on storage.objects for insert
with check (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- Storage policy: users can read their own files
create policy "Users can read own files"
on storage.objects for select
using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- Storage policy: users can delete their own files
create policy "Users can delete own files"
on storage.objects for delete
using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- Service role bypass for storage (for text extraction API)
create policy "Service role can read all files"
on storage.objects for select
using (bucket_id = 'documents');
