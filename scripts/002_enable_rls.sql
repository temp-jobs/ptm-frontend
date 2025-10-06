-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Companies policies
CREATE POLICY "Anyone can view companies"
  ON public.companies FOR SELECT
  USING (true);

CREATE POLICY "Employers can create companies"
  ON public.companies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Employers can update their own companies"
  ON public.companies FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Employers can delete their own companies"
  ON public.companies FOR DELETE
  USING (auth.uid() = user_id);

-- Jobs policies
CREATE POLICY "Anyone can view active jobs"
  ON public.jobs FOR SELECT
  USING (status = 'active' OR employer_id = auth.uid());

CREATE POLICY "Employers can create jobs"
  ON public.jobs FOR INSERT
  WITH CHECK (auth.uid() = employer_id);

CREATE POLICY "Employers can update their own jobs"
  ON public.jobs FOR UPDATE
  USING (auth.uid() = employer_id);

CREATE POLICY "Employers can delete their own jobs"
  ON public.jobs FOR DELETE
  USING (auth.uid() = employer_id);

-- Applications policies
CREATE POLICY "Users can view their own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = applicant_id OR auth.uid() IN (
    SELECT employer_id FROM public.jobs WHERE id = job_id
  ));

CREATE POLICY "Job seekers can create applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Applicants can update their own applications"
  ON public.applications FOR UPDATE
  USING (auth.uid() = applicant_id);

CREATE POLICY "Employers can update application status"
  ON public.applications FOR UPDATE
  USING (auth.uid() IN (
    SELECT employer_id FROM public.jobs WHERE id = job_id
  ));

-- Saved jobs policies
CREATE POLICY "Users can view their own saved jobs"
  ON public.saved_jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save jobs"
  ON public.saved_jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave jobs"
  ON public.saved_jobs FOR DELETE
  USING (auth.uid() = user_id);
