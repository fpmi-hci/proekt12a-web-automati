export function isAuthenticated()
{
    const token = localStorage.getItem('auth');
    return token !== null;
}