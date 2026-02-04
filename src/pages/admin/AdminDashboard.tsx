import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Video, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface Stats {
  modelsCount: number;
  interventionsCount: number;
  usersCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    modelsCount: 0,
    interventionsCount: 0,
    usersCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin, profile } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [modelsRes, interventionsRes, usersRes] = await Promise.all([
          supabase.from('models').select('*', { count: 'exact', head: true }),
          supabase.from('interventions').select('*', { count: 'exact', head: true }),
          isAdmin
            ? supabase.from('profiles').select('*', { count: 'exact', head: true })
            : Promise.resolve({ count: 0 }),
        ]);

        setStats({
          modelsCount: modelsRes.count || 0,
          interventionsCount: interventionsRes.count || 0,
          usersCount: usersRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin]);

  const statCards = [
    {
      title: 'Modelli',
      value: stats.modelsCount,
      description: 'Prodotti configurati',
      icon: Package,
      href: '/admin/models',
      color: 'text-primary',
    },
    {
      title: 'Interventi',
      value: stats.interventionsCount,
      description: 'Video testimonianze',
      icon: Video,
      href: '/admin/interventions',
      color: 'text-accent',
    },
  ];

  if (isAdmin) {
    statCards.push({
      title: 'Utenti',
      value: stats.usersCount,
      description: 'Utenti registrati',
      icon: Users,
      href: '/admin/users',
      color: 'text-muted-foreground',
    });
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome message */}
        <Card>
          <CardHeader>
            <CardTitle>Benvenuto, {profile?.full_name || 'Utente'}!</CardTitle>
            <CardDescription>
              {isAdmin
                ? 'Hai accesso completo a tutte le funzionalità di amministrazione.'
                : 'Puoi gestire i contenuti del sito da questa dashboard.'}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Stats grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} to={stat.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {isLoading ? '...' : stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Azioni rapide</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 md:grid-cols-2">
            <Link
              to="/admin/models"
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
            >
              <Package className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Gestisci Modelli</p>
                <p className="text-sm text-muted-foreground">
                  Aggiungi o modifica foto, video e descrizioni
                </p>
              </div>
            </Link>
            <Link
              to="/admin/interventions"
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
            >
              <Video className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">Gestisci Interventi</p>
                <p className="text-sm text-muted-foreground">
                  Aggiungi video testimonianze dei clienti
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
