-- El linter de seguridad de Supabase marcó crear_perfil_nuevo_usuario() (0001_init.sql)
-- como invocable públicamente vía RPC (anon/authenticated), al ser SECURITY DEFINER.
-- Es una función de trigger interna — revocar EXECUTE no rompe el trigger (Postgres
-- lo invoca sin chequear permisos de EXECUTE).
revoke execute on function public.crear_perfil_nuevo_usuario() from public, anon, authenticated;
